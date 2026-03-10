(async () => {
  const cards = document.querySelectorAll('.card[data-stars], .card[data-installs]');
  if (!cards.length) return;

  let data;
  try {
    const res = await fetch('https://gist.githubusercontent.com/Vikindor/d59c4bdaa17b19f7cd1c30404b4699a3/raw/personal-page-metrics.json');
    if (!res.ok) return;
    data = await res.json();
  } catch {
    return;
  }

  for (const card of cards) {
    const id = card.dataset.scriptId;
    if (!id || !data[id]) continue;

    const stars = data[id].stars;
    const installs = data[id].installs?.total;

    if (!(Number.isFinite(stars) && stars > 0) &&
        !(Number.isFinite(installs) && installs > 0)) {
      continue;
    }

    let metrics = card.querySelector('.meta-metrics');
    if (!metrics) {
      metrics = document.createElement('div');
      metrics.className = 'meta-metrics';
      card.querySelector('.meta')?.appendChild(metrics);
    }

    if (Number.isFinite(stars) && stars > 0 && card.hasAttribute('data-stars')) {
      const starsEl = document.createElement('div');
      starsEl.className = 'stars';
      starsEl.title = 'GitHub stars';

      starsEl.innerHTML = `
        <span>⭐</span>
        <span>${stars.toLocaleString()}</span>
      `;

      metrics.appendChild(starsEl);
    }

    if (Number.isFinite(installs) && installs > 0 && card.hasAttribute('data-installs')) {
      const installsEl = document.createElement('div');
      installsEl.className = 'installs';
      installsEl.title = 'Total installs (GreasyFork + OpenUserJS)';

      installsEl.innerHTML = `
        <img src="icons/install_icon.png" class="icon-installs">
        <span>Installs: ${installs.toLocaleString()}</span>
      `;

      metrics.appendChild(installsEl);
    }
  }
})();
