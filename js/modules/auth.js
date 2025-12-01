import { toggleBodyLock } from "./modal-lock.js";
export function initAuth () {
//кнопка логин 
const logIn = document.querySelector('.header__order');
const accountBtn = document.querySelector('.account-btn');
const accLog = document.querySelector('.acc__modal-log');
const accOver = document.querySelector('.acc__modal-overlay');
const accClose = accLog.querySelector('.modal__close')
//открытие кнопки логин
logIn.addEventListener('click',()=>{
accLog.classList.remove('hidden');
toggleBodyLock();
});
//модалка логин закрывается по клику на крестик 
accClose.addEventListener('click',()=>{
accLog.classList.add('hidden');
 accLog.setAttribute('aria-hidden','true');
 toggleBodyLock();
 
});
//модалка закрывается по клику на свобобдное пространство 
accOver.addEventListener('click',()=>{
  accLog.setAttribute('aria-hidden','true');
  accLog.classList.add('hidden');
  toggleBodyLock();
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
     accLog.classList.add('hidden');
     toggleBodyLock();
  }

});
  regOver.addEventListener('click',()=>{
  regModal.setAttribute('aria-hidden','true');
  regModal.classList.add('hidden');
  toggleBodyLock();
  });
regClose.addEventListener('click',()=>{
 regModal.setAttribute('aria-hidden','true');
  regModal.classList.add('hidden');
  toggleBodyLock();
});
//универсальная модалка авторизации 
const universal = document.querySelector('.universal__modal');
const checkOut = document.querySelector('.reg-btn');

checkOut.addEventListener('click', () => {
      // Закрываем регистрацию
    regModal.classList.add('hidden');
    regModal.setAttribute('aria-hidden', 'true');
    toggleBodyLock();
      // Открываем универсальную
    universal.classList.remove('hidden');
    universal.setAttribute('aria-hidden', 'false'); 
    const registrationEmail = regModal.querySelector('input[type="email"]');
    const universalEmail = universal.querySelector('input[type="email"]');
     universalEmail.value = registrationEmail.value;
});
//закрытие универсальной по крестику 
const universalClose = document.querySelector('.universal__close');
universalClose.addEventListener('click',()=>{
  universal.classList.add('hidden');
  universal.setAttribute('aria-hidden', 'true'); 
  toggleBodyLock();
});
//закрытие универсальной по оверлею
const universalOver = document.querySelector('.universal__overlay');
universalOver.addEventListener('click',()=>{
  universal.classList.add('hidden');
  universal.setAttribute('aria-hidden', 'true'); 
  toggleBodyLock();
});
//закрытие окна авторизации после нажатия на кнопку логин
function switchAcc (){
  logIn.classList.add('hidden'); 
  accountBtn.classList.remove('hidden');
}
const universalBtn = document.querySelector('.universal__btn');
universalBtn.addEventListener('click',(event)=>{
universal.classList.add('hidden');
universal.setAttribute('aria-hidden', 'true'); 
toggleBodyLock();
switchAcc();
});
//сделать попап видимым
const popup = document.querySelector('.account-popup');
accountBtn.addEventListener('click',(event)=>{
event.stopPropagation();
popup.classList.remove('hidden');
popup.setAttribute('aria-hidden', 'false'); 
});
//закрыть попап по клику на свободное пространство 
document.addEventListener('click', (event) => {
  const clickedInside = popup.contains(event.target) || accountBtn.contains(event.target);

  if (!clickedInside) {
    popup.classList.add('hidden');
  }
});
};
