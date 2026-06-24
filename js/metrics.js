(async () => {
  const cards = document.querySelectorAll('.card[data-stars], .card[data-installs], .card[data-manual-installs], .card[data-release]');
  if (!cards.length) return;

  const formatDate = (date) => {
    const parsed = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return date;

    return new Intl.DateTimeFormat('en', {
      month: 'short',
      year: 'numeric'
    }).format(parsed);
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
      release.title = 'Release date';
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
      installsEl.title = 'Total installs from all sources';

      const icon = document.createElement('img');
      icon.src = 'icons/download.png';
      icon.alt = '';
      icon.className = 'icon-metric';

      const label = document.createElement('span');
      label.textContent = `Installs: ${installs.toLocaleString()}`;

      installsEl.append(icon, label);
      metrics.appendChild(installsEl);
    }

    if (Number.isFinite(stars) && stars > 0 && card.hasAttribute('data-stars')) {
      const starsEl = document.createElement('div');
      starsEl.className = 'stars';
      starsEl.title = 'GitHub stars';

      const icon = document.createElement('img');
      icon.src = 'icons/star.png';
      icon.alt = '';
      icon.className = 'icon-metric';

      const label = document.createElement('span');
      label.textContent = stars.toLocaleString();

      starsEl.append(icon, label);
      metrics.appendChild(starsEl);
    }
  }
})();
