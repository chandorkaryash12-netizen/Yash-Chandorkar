// Vector admin: repeaters, image previews, theme preview and small helpers.
(function () {
  var side = document.querySelector('[data-admin-side]');
  var tog = document.querySelector('[data-admin-toggle]');
  if (side && tog) {
    tog.addEventListener('click', function (e) { e.stopPropagation(); side.classList.toggle('open'); });
    document.addEventListener('click', function (e) { if (!side.contains(e.target)) side.classList.remove('open'); });
  }

  // Show/hide inline forms (Add user, Enrol a client).
  document.querySelectorAll('[data-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.getAttribute('data-open'));
      el.classList.toggle('hidden');
      var first = el.querySelector('input, select');
      if (first && !el.classList.contains('hidden')) first.focus();
    });
  });

  document.querySelectorAll('[data-autosubmit]').forEach(function (el) {
    el.addEventListener('change', function () { el.form.submit(); });
  });

  // Repeating list editor.
  document.querySelectorAll('[data-repeater]').forEach(function (form) {
    var rows = form.querySelector('[data-rows]');
    form.addEventListener('click', function (e) {
      var row = e.target.closest('[data-row]');
      if (e.target.matches('[data-add]')) {
        var tpl = rows.querySelector('[data-row]').cloneNode(true);
        tpl.querySelectorAll('input, textarea').forEach(function (i) { i.value = ''; });
        rows.appendChild(tpl);
        tpl.querySelector('input, textarea').focus();
      } else if (e.target.matches('[data-remove]') && row) {
        if (rows.querySelectorAll('[data-row]').length > 1) row.remove();
        else row.querySelectorAll('input, textarea').forEach(function (i) { i.value = ''; });
      } else if (e.target.matches('[data-up]') && row && row.previousElementSibling) {
        rows.insertBefore(row, row.previousElementSibling);
      } else if (e.target.matches('[data-down]') && row && row.nextElementSibling) {
        rows.insertBefore(row.nextElementSibling, row);
      }
    });
  });

  // Live image preview before upload.
  document.querySelectorAll('[data-preview-input]').forEach(function (input) {
    input.addEventListener('change', function () {
      var box = document.querySelector('[data-preview="' + input.getAttribute('data-preview-input') + '"]');
      var file = input.files && input.files[0];
      if (!box || !file) return;
      var img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      box.innerHTML = '';
      box.appendChild(img);
    });
  });

  // Copy media URL.
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-copy');
      var done = function () { btn.textContent = 'Copied!'; setTimeout(function () { btn.textContent = 'Copy URL'; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { window.prompt('Copy this URL:', url); });
      else window.prompt('Copy this URL:', url);
    });
  });

  // Live theme preview.
  var preview = document.querySelector('[data-theme-preview]');
  if (preview) {
    var root = document.documentElement;
    var map = { primary: '--primary', accent: '--accent', secondary: '--secondary', heading: '--heading', background: '--bg', text: '--text' };
    document.querySelectorAll('[data-theme-var]').forEach(function (input) {
      input.addEventListener('input', function () {
        root.style.setProperty(map[input.getAttribute('data-theme-var')], input.value);
        input.nextElementSibling.textContent = input.value;
      });
    });
    var radius = document.querySelector('[data-radius]');
    var out = document.querySelector('[data-radius-out]');
    radius.addEventListener('input', function () { out.textContent = radius.value; root.style.setProperty('--radius', radius.value + 'px'); });
    document.querySelectorAll('select[name=headingFont], select[name=bodyFont]').forEach(function (sel) {
      sel.addEventListener('change', function () {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(sel.value).replace(/%20/g, '+') + ':wght@400;600;700&display=swap';
        document.head.appendChild(link);
        root.style.setProperty(sel.name === 'headingFont' ? '--font-heading' : '--font-body', "'" + sel.value + "', sans-serif");
      });
    });
  }
})();
