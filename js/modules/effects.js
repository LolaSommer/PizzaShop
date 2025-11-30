export function initEffects() {
  //эффект волны на кнопке 
function addRippleEffect(button) {
  button.classList.add('ripple');
  
  button.addEventListener('click', function (event) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}
const orderButtons = document.querySelectorAll('.card__order');
orderButtons.forEach(btn => addRippleEffect(btn));
const checkout = document.querySelectorAll('.cart__modal-checkout');
checkout.forEach(btn => addRippleEffect(btn));  
}

