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

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const filterButtons = document.querySelectorAll('[data-filter]');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length && portfolioItems.length) {
  const setFilter = (filter) => {
    filterButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.filter === filter);
    });

    portfolioItems.forEach((item) => {
      const categories = item.dataset.category ? item.dataset.category.split(' ') : [];
      const shouldShow = filter === 'all' || categories.includes(filter);
      item.classList.toggle('is-hidden', !shouldShow);
      item.hidden = !shouldShow;
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter || 'all'));
  });
}
