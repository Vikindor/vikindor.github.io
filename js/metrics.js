(async () => {
  const cards = document.querySelectorAll('.card[data-stars], .card[data-installs], .card[data-manual-installs], .card[data-release]');
  if (!cards.length) return;

  const formatDate = (date, lang = document.documentElement.lang) => {
    const [day, month, year] = date.split('-').map(Number);
    const parsed = new Date(year, month - 1, day);

    if (Number.isNaN(parsed.getTime())) return date;

    const parts = new Intl.DateTimeFormat(lang, {
      month: 'short',
      year: 'numeric'
    }).formatToParts(parsed);
    const monthLabel = parts.find(part => part.type === 'month')?.value;
    const yearLabel = parts.find(part => part.type === 'year')?.value;

    return monthLabel && yearLabel ? `${monthLabel} ${yearLabel}` : date;
  };

  const updateReleaseDates = (lang = document.documentElement.lang) => {
    document.querySelectorAll('.release-date[data-release-date]').forEach(release => {
      release.textContent = formatDate(release.dataset.releaseDate, lang);
    });
  };

  const ensureFooter = (card) => {
    let footer = card.querySelector('.card-footer');
    if (!footer) {
      footer = document.createElement('div');
      footer.className = 'card-footer';
      card.appendChild(footer);
    }

    let release = footer.querySelector('.release-date');
    if (!release && card.dataset.release) {
      release = document.createElement('div');
      release.className = 'release-date';
      release.dataset.releaseDate = card.dataset.release;
      release.dataset.i18nTitle = 'metrics.releaseDateTitle';
      release.textContent = formatDate(card.dataset.release);
      footer.appendChild(release);
    }

    let metrics = footer.querySelector('.meta-metrics');
    if (!metrics) {
      metrics = document.createElement('div');
      metrics.className = 'meta-metrics';
      footer.appendChild(metrics);
    }

    return metrics;
  };

  for (const card of cards) {
    ensureFooter(card);
  }

  document.addEventListener('i18n:change', event => {
    updateReleaseDates(event.detail.lang);
  });

  let data;
  try {
    const res = await fetch('https://gist.githubusercontent.com/Vikindor/bcc0b4b66a5cb9a06960a921197c29cd/raw/personal-page-metrics.json');
    if (!res.ok) return;
    data = await res.json();
  } catch {
    return;
  }

  for (const card of cards) {
    const id = card.dataset.scriptId;
    if (!id || !data[id]) continue;

    const stars = data[id].stars;
    const manualInstalls = Number(card.dataset.manualInstalls);
    const installs = Number.isFinite(manualInstalls)
      ? manualInstalls
      : data[id].installs?.total;
    const metrics = ensureFooter(card);

    if (Number.isFinite(installs) && installs > 0 &&
        (card.hasAttribute('data-installs') || card.hasAttribute('data-manual-installs'))) {
      const installsEl = document.createElement('div');
      installsEl.className = 'installs';
      installsEl.dataset.i18nTitle = 'metrics.installsTitle';

      const icon = document.createElement('img');
      icon.src = 'images/download.png';
      icon.alt = '';
      icon.className = 'icon-metric';

      const label = document.createElement('span');
      label.dataset.i18n = 'metrics.installs';

      const value = document.createElement('span');
      value.textContent = installs.toLocaleString();

      installsEl.append(icon, label, value);
      metrics.appendChild(installsEl);
    }

    if (Number.isFinite(stars) && stars > 0 && card.hasAttribute('data-stars')) {
      const starsEl = document.createElement('div');
      starsEl.className = 'stars';
      starsEl.dataset.i18nTitle = 'metrics.starsTitle';

      const icon = document.createElement('img');
      icon.src = 'images/star.png';
      icon.alt = '';
      icon.className = 'icon-metric';

      const label = document.createElement('span');
      label.textContent = stars.toLocaleString();

      starsEl.append(icon, label);
      metrics.appendChild(starsEl);
    }
  }

  window.applyI18n?.();
})();
