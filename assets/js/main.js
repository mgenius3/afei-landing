// AFEI — site interactions
document.documentElement.classList.add('js');

(function () {
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');

  // Sticky header shadow
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 5) * 70}ms`;
      io.observe(el);
    });
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  // Event countdown (convening page)
  const countdown = document.getElementById('countdown');
  if (countdown) {
    const target = new Date(countdown.dataset.date).getTime();
    const fields = ['days', 'hours', 'mins', 'secs'].map((k) => countdown.querySelector(`[data-unit="${k}"]`));
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const values = [
        Math.floor(diff / 86400000),
        Math.floor(diff / 3600000) % 24,
        Math.floor(diff / 60000) % 60,
        Math.floor(diff / 1000) % 60,
      ];
      fields.forEach((el, i) => { el.textContent = String(values[i]).padStart(2, '0'); });
      if (diff === 0) clearInterval(timer);
    };
    const timer = setInterval(tick, 1000);
    tick();
  }

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
