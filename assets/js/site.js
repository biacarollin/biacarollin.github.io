/* Idioma e menu do site.
   O português vem do próprio HTML. O inglês vem do objeto EN definido em cada página.
   A escolha fica salva no navegador e vale para todas as páginas. */
(function () {
  var nodes = document.querySelectorAll('[data-i18n]');
  var PT = {};
  nodes.forEach(function (el) { PT[el.getAttribute('data-i18n')] = el.innerHTML; });

  function apply(lang) {
    var dict = lang === 'en' ? (window.EN || {}) : PT;
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    var titles = window.TITLES || {};
    if (titles[lang]) document.title = titles[lang];
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }

  window.setLang = function (lang) {
    apply(lang);
    try { localStorage.setItem('lang', lang); } catch (e) {}
  };

  window.toggleNav = function () {
    var nav = document.querySelector('.nav');
    var btn = nav.querySelector('.nav-toggle');
    var open = nav.classList.toggle('open');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { document.querySelector('.nav').classList.remove('open'); });
  });

  var saved = 'pt';
  try { saved = localStorage.getItem('lang') || 'pt'; } catch (e) {}
  if (saved === 'en') apply('en');
})();
