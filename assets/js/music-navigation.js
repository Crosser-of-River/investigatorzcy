(() => {
  const audio = document.getElementById('music-audio');
  const player = document.getElementById('persistent-music');
  if (!audio || !player || !window.fetch || !window.DOMParser) return;
  const status = document.getElementById('music-status');
  let controller;
  let serial = 0;
  let currentURL = location.href;
  const positions = new Map();
  history.scrollRestoration = 'manual';
  window.addEventListener('scroll', () => positions.set(currentURL, [scrollX, scrollY]), { passive: true });

  function setMusic() {
    const config = document.getElementById('page-music');
    const active = config?.dataset.enabled === 'true' && config.dataset.src;
    if (!active) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      player.hidden = true;
      return;
    }
    const src = new URL(config.dataset.src, location.href).href;
    const continuing = !audio.paused && !audio.ended;
    player.hidden = false;
    document.getElementById('music-title').textContent = '♫ ' + config.dataset.title;
    audio.setAttribute('aria-label', config.dataset.title);
    if (audio.src === src) return; // Keep the same DOM element and playback position.
    audio.src = src;
    audio.load();
    status.textContent = '点击上方 ▶ 播放；音乐不会自动开始。';
    if (continuing) audio.play().catch(() => {
      status.textContent = '浏览器暂停了播放，请点击 ▶ 继续。';
    });
  }
  audio.addEventListener('error', () => {
    if (audio.hasAttribute('src')) status.textContent = '音乐暂时无法加载，请稍后重试。';
  });
  audio.addEventListener('play', () => { status.textContent = '站内切换页面时，同一首音乐会继续播放。'; });

  function activateScripts(container) {
    container.querySelectorAll('script').forEach(old => {
      if (old.type && !['text/javascript', 'application/javascript', 'module'].includes(old.type)) return;
      const script = document.createElement('script');
      for (const attr of old.attributes) script.setAttribute(attr.name, attr.value);
      // Theme inline scripts declare top-level variables: isolate each initialization.
      if (!old.src) script.textContent = old.type === 'module' ? old.textContent : `(() => {\n${old.textContent}\n})();`;
      old.replaceWith(script);
    });
  }

  async function navigate(url, isPop = false) {
    const id = ++serial;
    controller?.abort();
    controller = new AbortController();
    try {
      const response = await fetch(url.href, { signal: controller.signal });
      if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) throw new Error('Not a page');
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      const next = doc.getElementById('site-page');
      if (!next || !doc.getElementById('page-music')) throw new Error('Unsupported page');
      if (id !== serial) return;
      // A future page with additional head scripts needs its normal initialization.
      const currentScripts = new Set([...document.head.querySelectorAll('script[src]')].map(s => s.src));
      if ([...doc.head.querySelectorAll('script[src]')].some(s => !currentScripts.has(s.src))) throw new Error('New page scripts');
      if (!isPop) {
        positions.set(currentURL, [scrollX, scrollY]);
        history.pushState({}, '', url.href);
      }
      currentURL = url.href;
      document.title = doc.title;
      const metadata = 'meta[name="description"],meta[property],meta[name^="twitter"],link[rel="canonical"],script[type="application/ld+json"]';
      document.head.querySelectorAll(metadata).forEach(el => el.remove());
      doc.head.querySelectorAll(metadata).forEach(el => document.head.append(el.cloneNode(true)));
      document.body.className = doc.body.className;
      document.getElementById('site-page').replaceWith(next);
      setMusic();
      activateScripts(next); // In particular, load a fresh giscus thread for this pathname.
      const main = next.querySelector('main');
      main?.setAttribute('tabindex', '-1');
      main?.focus({ preventScroll: true });
      if (isPop && positions.has(currentURL)) scrollTo(...positions.get(currentURL));
      else if (url.hash) document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
      else scrollTo(0, 0);
      window.dispatchEvent(new Event('scroll'));
    } catch (error) {
      if (error.name !== 'AbortError' && id === serial) location.assign(url.href);
    }
  }

  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.hasAttribute('download') || (link.target && link.target !== '_self') || link.hasAttribute('data-no-navigation')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return;
    if (url.pathname === location.pathname && url.search === location.search) {
      controller?.abort();
      ++serial;
      return;
    }
    if (/\.[^/]+$/.test(url.pathname) && !/\.html?$/.test(url.pathname)) return;
    event.preventDefault();
    navigate(url);
  });
  window.addEventListener('popstate', () => {
    const url = new URL(location.href);
    const previous = new URL(currentURL);
    if (url.pathname === previous.pathname && url.search === previous.search) {
      controller?.abort();
      ++serial;
      currentURL = url.href;
      if (url.hash) document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
      else scrollTo(0, 0);
      return;
    }
    navigate(url, true);
  });
})();
