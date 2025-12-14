export function toggleBodyLock() {
  const overlays = [...document.querySelectorAll('.modal-open')];

  const anyOpen = overlays.some((el) => {
    if (el.classList.contains('cart__modal')) {
      return el.classList.contains('is-open');
    }
    if (el.hasAttribute('hidden') || el.classList.contains('hidden')) return false;

    const cs = window.getComputedStyle(el);
    const visible = cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
    return visible;
  });

  document.body.classList.toggle('modal__body-active', anyOpen);
}


