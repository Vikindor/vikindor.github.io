(function () {
  const LANG_KEY = "lang";
  const langMenu = document.querySelector("[data-lang-menu]");
  const langToggle = document.querySelector("[data-lang-toggle]");
  const langPopup = document.querySelector("[data-lang-popup]");
  let currentDict;

  function getByPath(obj, path) {
    return path.split(".").reduce((acc, key) => acc[key], obj);
  }

  function setLangMenuOpen(isOpen) {
    if (!langToggle || !langPopup) return;

    langToggle.setAttribute("aria-expanded", String(isOpen));
    langPopup.hidden = !isOpen;
  }

  function applyTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = getByPath(dict, el.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(el => {
      el.title = getByPath(dict, el.dataset.i18nTitle);
    });
  }

  async function loadLang(lang) {
    const res = await fetch(`data/i18n/${lang}.json`);
    const dict = await res.json();

    currentDict = dict;
    document.documentElement.lang = lang;
    applyTranslations(dict);

    document.querySelectorAll("[data-href-en]").forEach(el => {
      const key = `href${lang[0].toUpperCase()}${lang.slice(1)}`;
      if (el.dataset[key]) {
        el.href = el.dataset[key];
      }
    });

    document.querySelectorAll("[data-lang]").forEach(el => {
      el.classList.toggle("lang-current", el.dataset.lang === lang);
    });

    localStorage.setItem(LANG_KEY, lang);
    setLangMenuOpen(false);
  }

  const initialLang = localStorage.getItem(LANG_KEY) || "en";
  window.applyI18n = () => {
    if (currentDict) {
      applyTranslations(currentDict);
    }
  };

  void loadLang(initialLang);

  document.addEventListener("click", e => {
    const toggle = e.target.closest("[data-lang-toggle]");
    if (toggle) {
      e.preventDefault();
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setLangMenuOpen(!isOpen);
      return;
    }

    const btn = e.target.closest("[data-lang]");
    if (btn) {
      e.preventDefault();
      void loadLang(btn.dataset.lang);
      return;
    }

    if (langMenu && !e.target.closest("[data-lang-menu]")) {
      setLangMenuOpen(false);
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      setLangMenuOpen(false);
    }
  });
})();
