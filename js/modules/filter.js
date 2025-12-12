export function initFilter() {
  const menuFilter = document.querySelector('.menu__filter');
  const menuCards = document.querySelectorAll('.menu__card');

  menuFilter.addEventListener('click', (event) => {
    const btn = event.target.closest('.menu__item');
    if (!btn) return;

    const category = btn.dataset.filter;

    document.querySelectorAll('.menu__item')
      .forEach(b => b.classList.remove('btn-active'));
    btn.classList.add('btn-active');

    menuCards.forEach((card, index) => {
      const shouldShow =
        category === 'all' || card.dataset.category === category;

      if (shouldShow) {
        // вход
        card.classList.remove('hidden');
        card.classList.add('is-entering');

        card.style.transitionDelay = `${index * 40}ms`;

        requestAnimationFrame(() => {
          card.classList.remove('is-entering');
        });
      } else {
        // выход
        card.style.transitionDelay = '0ms';
        card.classList.add('hidden');
      }
    });
  });
}



