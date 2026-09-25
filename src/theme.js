// Default brand theme (charcoal and silver from the Vector emblem) and the
// helpers that turn the saved theme into CSS variables + a Google Fonts URL.
function seedTheme() {
  return {
    primary: '#17191d',
    accent: '#e2e5e9',
    secondary: '#aab3be',
    background: '#f6f7f8',
    text: '#15171a',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Manrope',
    radius: 14,
  };
}

function fontsUrl(theme) {
  const family = (name, weights) => `family=${encodeURIComponent(name).replace(/%20/g, '+')}:wght@${weights}`;
  const fams = [family(theme.headingFont, '500;600;700')];
  if (theme.bodyFont !== theme.headingFont) fams.push(family(theme.bodyFont, '400;500;600;700'));
  return `https://fonts.googleapis.com/css2?${fams.join('&')}&display=swap`;
}

function cssVars(theme) {
  // Output is written unescaped into a <style> tag, so every value is
  // re-validated here rather than trusted from the database.
  const d = seedTheme();
  const t = { ...d, ...theme };
  const color = (v, fallback) => (/^#[0-9a-f]{6}$/i.test(v) ? v : fallback);
  const font = (name, fallback) => `'${String(name).replace(/[^a-z0-9 ]/gi, '')}', ${fallback}`;
  return [
    `--primary:${color(t.primary, d.primary)}`,
    `--accent:${color(t.accent, d.accent)}`,
    `--secondary:${color(t.secondary, d.secondary)}`,
    `--bg:${color(t.background, d.background)}`,
    `--text:${color(t.text, d.text)}`,
    `--radius:${Math.min(28, Math.max(0, Number(t.radius) || 0))}px`,
    `--font-heading:${font(t.headingFont, 'Georgia, serif')}`,
    `--font-body:${font(t.bodyFont, 'system-ui, sans-serif')}`,
  ].join(';');
}

module.exports = { seedTheme, fontsUrl, cssVars };
