const menuButton = document.querySelector('.menu-btn');
const siteNav = document.querySelector('.site-nav');

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

if (menuButton && siteNav) {
  const closeMenu = () => {
    siteNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest('.site-header')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in globalThis)) {
  revealElements.forEach((element) => {
    element.classList.add('is-visible');
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    },
    { rootMargin: '150px', threshold: 0.01 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length && portfolioItems.length) {
  const filterStatus = document.getElementById('filter-status');

  const setFilter = (filter) => {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    let visibleCount = 0;
    portfolioItems.forEach((item) => {
      const categories = item.dataset.category ? item.dataset.category.split(' ') : [];
      const shouldShow = filter === 'all' || categories.includes(filter);
      item.classList.toggle('is-hidden', !shouldShow);
      item.hidden = !shouldShow;
      if (shouldShow) visibleCount++;
    });

    if (filterStatus) {
      const activeButton = [...filterButtons].find((b) => b.dataset.filter === filter);
      const label = activeButton ? activeButton.textContent.trim() : filter;
      filterStatus.textContent =
        filter === 'all'
          ? `Mostrando ${visibleCount} fotos`
          : `Mostrando ${visibleCount} fotos de ${label.toLowerCase()}`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter || 'all'));
  });

  const defaultFilter = document.querySelector('.filter-btn.is-active')?.dataset.filter;
  if (defaultFilter) setFilter(defaultFilter);
}

// Cookie banner
function loadGA() {
  if (document.getElementById('ga-script')) return;

  globalThis.dataLayer = globalThis.dataLayer || [];
  globalThis.gtag =
    globalThis.gtag ||
    function gtag() {
      globalThis.dataLayer.push(arguments);
    };

  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-QRXP83WV9M';
  document.head.appendChild(s);
  globalThis.gtag('js', new Date());
  globalThis.gtag('config', 'G-QRXP83WV9M');
}

function loadHotjar() {
  (function (h, o, t, j) {
    h.hj =
      h.hj ||
      function () {
        if (!h.hj.q) h.hj.q = [];
        h.hj.q.push(arguments);
      };
    h._hjSettings = { hjid: 3327732, hjsv: 6 };
    const head = o.getElementsByTagName('head')[0];
    const script = o.createElement('script');
    script.async = 1;
    script.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    head.appendChild(script);
  })(globalThis, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
}

function loadClarity() {
  (function (c, l, a, r, i) {
    c[a] =
      c[a] ||
      function () {
        if (!c[a].q) c[a].q = [];
        c[a].q.push(arguments);
      };
    const script = l.createElement(r);
    script.async = 1;
    script.src = 'https://www.clarity.ms/tag/' + i;
    const head = l.getElementsByTagName(r)[0];
    head.parentNode.insertBefore(script, head);
  })(globalThis, document, 'clarity', 'script', 'wrasj3g5v7');
}

const cookieBanner = document.getElementById('cookieBanner');
if (cookieBanner) {
  const acceptButton = cookieBanner.querySelector('.cookie-accept');
  const rejectButton = cookieBanner.querySelector('.cookie-reject');
  const getConsent = () => {
    try {
      return localStorage.getItem('cookie-consent');
    } catch {
      return null;
    }
  };
  const setConsent = (value) => {
    try {
      localStorage.setItem('cookie-consent', value);
    } catch {
      // If storage is blocked, the visible choice should still close the banner.
    }
  };

  const deferAnalytics = () => {
    const cb = () => {
      loadGA();
      loadClarity();
      loadHotjar();
    };

    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(cb);
    } else {
      setTimeout(cb, 200);
    }
  };

  const consent = getConsent();
  if (!consent) {
    requestAnimationFrame(() => {
      setTimeout(() => cookieBanner.classList.add('is-visible'), 600);
    });
  } else if (consent === 'accepted') {
    deferAnalytics();
  }

  acceptButton?.addEventListener('click', () => {
    setConsent('accepted');
    cookieBanner.classList.remove('is-visible');
    deferAnalytics();
  });

  const rejectCookies = () => {
    setConsent('rejected');
    cookieBanner.classList.remove('is-visible');
  };

  rejectButton?.addEventListener('click', rejectCookies);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && cookieBanner.classList.contains('is-visible')) {
      rejectCookies();
    }
  });
}
