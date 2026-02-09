(function () {
  const LANG_KEY = "lang";

  function getByPath(obj, path) {
    return path.split(".").reduce((acc, key) => acc[key], obj);
  }

  async function loadLang(lang) {
    const res = await fetch(`data/i18n/${lang}.json`);
    const dict = await res.json();

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = getByPath(dict, el.dataset.i18n);
    });

    document.querySelectorAll("[data-mail-en]").forEach(el => {
      const key = `mail${lang[0].toUpperCase()}${lang.slice(1)}`;
      el.href = `mailto:${el.dataset[key]}`;
    });

    document.querySelectorAll("[data-lang]").forEach(el => {
      el.classList.toggle("lang-current", el.dataset.lang === lang);
    });

    localStorage.setItem(LANG_KEY, lang);
  }

  const initialLang = localStorage.getItem(LANG_KEY) || "en";
  loadLang(initialLang);

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;

    e.preventDefault();
    loadLang(btn.dataset.lang);
  });
})();
