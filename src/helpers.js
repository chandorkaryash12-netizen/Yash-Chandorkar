const crypto = require('crypto');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function inline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g, '<a href="$2" rel="noopener">$1</a>');
}

// A deliberately small, safe formatter for text typed into the admin panel:
// "## Heading", "### Subheading", "- bullet", "1. item", **bold**, *italic*,
// [link](url) and blank-line separated paragraphs. Input is escaped first, so
// no raw HTML ever reaches the page.
function formatText(source) {
  const lines = escapeHtml(source || '').replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let para = [];
  let list = null;

  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`);
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    let m;
    if (!line) {
      flushPara();
      flushList();
    } else if ((m = line.match(/^(#{2,3})\s+(.*)$/))) {
      flushPara();
      flushList();
      const tag = m[1].length === 2 ? 'h2' : 'h3';
      out.push(`<${tag}>${inline(m[2])}</${tag}>`);
    } else if ((m = line.match(/^[-•]\s+(.*)$/))) {
      flushPara();
      if (!list || list.tag !== 'ul') { flushList(); list = { tag: 'ul', items: [] }; }
      list.items.push(m[1]);
    } else if ((m = line.match(/^\d+[.)]\s+(.*)$/))) {
      flushPara();
      if (!list || list.tag !== 'ol') { flushList(); list = { tag: 'ol', items: [] }; }
      list.items.push(m[1]);
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return out.join('\n');
}

function formatINR(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return 'Free';
  return '₹' + n.toLocaleString('en-IN');
}

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function lines(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

// Modules are edited as plain text:
//   ## Module title
//   One-line summary
//   - topic
//   - topic
function parseModules(text) {
  const modules = [];
  let current = null;
  for (const line of lines(text)) {
    let m;
    if ((m = line.match(/^#{1,3}\s*(.+)$/))) {
      current = { title: m[1].trim(), summary: '', topics: [] };
      modules.push(current);
    } else if (!current) {
      current = { title: line, summary: '', topics: [] };
      modules.push(current);
    } else if ((m = line.match(/^[-•*]\s*(.+)$/))) {
      current.topics.push(m[1].trim());
    } else {
      current.summary = current.summary ? `${current.summary} ${line}` : line;
    }
  }
  return modules;
}

function modulesToText(modules) {
  return (modules || [])
    .map((m) => [`## ${m.title}`, m.summary, ...(m.topics || []).map((t) => `- ${t}`)].filter(Boolean).join('\n'))
    .join('\n\n');
}

// Materials: "Title | https://link" one per line
function parseMaterials(text) {
  return lines(text).map((line) => {
    const [title, url] = line.split('|').map((s) => s.trim());
    return url ? { title, url } : { title: line, url: '' };
  });
}

function materialsToText(materials) {
  return (materials || []).map((m) => (m.url ? `${m.title} | ${m.url}` : m.title)).join('\n');
}

function safeUrl(url) {
  const u = String(url || '').trim();
  if (/^(https?:\/\/|\/|mailto:|tel:)/i.test(u)) return u;
  return '';
}

function randomToken(bytes = 24) {
  return crypto.randomBytes(bytes).toString('hex');
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || ''));
}

module.exports = {
  escapeHtml,
  formatText,
  formatINR,
  formatDate,
  lines,
  parseModules,
  modulesToText,
  parseMaterials,
  materialsToText,
  safeUrl,
  randomToken,
  isEmail,
};
