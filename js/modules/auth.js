export function initAuth () {
//кнопка логин 
const logIn = document.querySelector('.header__order');
const accLog = document.querySelector('.acc__modal-log');
const accOver = document.querySelector('.acc__modal-overlay');
const accClose = accLog.querySelector('.modal__close')
//открытие кнопки логин
logIn.addEventListener('click',()=>{
accLog.classList.remove('hidden');
document.body.classList.add('modal__body-active');
});
//модалка логин закрывается по клику на крестик 
accClose.addEventListener('click',()=>{
accLog.classList.add('hidden');
 accLog.setAttribute('aria-hidden','true');
 document.body.classList.remove('modal__body-active');
 
});
//модалка закрывается по клику на свобобдное пространство 
accOver.addEventListener('click',()=>{
  accLog.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal__body-active');
  accLog.classList.add('hidden');
});
//окно регистрации 
const regModal = document.querySelector('.reg__form');
const accGroup = document.querySelector('.acc__modal-group');
const regOver = regModal.querySelector('.reg__overlay');
const regClose = regModal.querySelector('.modal__close');
accGroup.addEventListener('click', (event) => {
    const btn = event.target.closest('a');
    if (!btn) return;
  if(btn.classList.contains('acc__modal-post')){
    regModal.classList.remove('hidden');
    regModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal__body-active');
     accLog.classList.add('hidden');
  }

});
  regOver.addEventListener('click',()=>{
  regModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal__body-active');
  regModal.classList.add('hidden');
  });
regClose.addEventListener('click',()=>{
 regModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal__body-active');
  regModal.classList.add('hidden');
});

}
