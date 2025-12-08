import { toggleBodyLock } from "./modal-lock.js";
import { clearCart } from "./cart.js";
import { getRawTotal } from "./cart.js";
  //=============== STATE ===============
const currentUser = {
  name: '',
  email: '',
  provider: ''
};
let universal;
let universalBtn;
export function openUniversal() {
  universal.classList.remove('hidden');
  universal.setAttribute('aria-hidden', 'false'); 
}
export function initAuth () {
// =============== SELECTORS ===============
const logIn = document.querySelector('.header__order');
const accountBtn = document.querySelector('.account-btn');
const accLog = document.querySelector('.acc__modal-log');
const accOver = document.querySelector('.acc__modal-overlay');
const accClose = accLog.querySelector('.modal__close');
const regModal = document.querySelector('.reg__form');
const accGroup = document.querySelector('.acc__modal-group');
const regOver = regModal.querySelector('.reg__overlay');
const regClose = regModal.querySelector('.modal__close');
const checkOut = document.querySelector('.reg-btn');
universal = document.querySelector('.universal__modal');
const universalClose = document.querySelector('.universal__close');
const universalOver = document.querySelector('.universal__overlay');
universalBtn = document.querySelector('.universal__btn');
const popup = document.querySelector('.account-popup');
const logoutBtn = document.querySelector('.account-popup__btn');
const alreadyAcc = document.querySelector('.acc__modal-link');
const socialGroup = document.querySelector('.social__group');
const socialApple = document.querySelector('.social__apple'); 
const socialGoogle = document.querySelector('.social__google'); 
const socialFacebook = document.querySelector('.social__facebook');
const socialModalBtn = document.querySelector('.acc__modal-group');
const socialModal = document.querySelector('.social__modal');
const socialCloseBtn = document.querySelector('.social__close');
const socialOverClose = document.querySelector('.social__overlay');
const thanks = document.querySelector('.thankyou__modal');
const thanksClose = document.querySelector('.thankyou__close');
const thanksOverlay = document.querySelector('.thankyou__overlay');

// =============== UTILS ===============
function logoutAcc(){
currentUser.name = '';
currentUser.email = '';
currentUser.provider = '';
logIn.classList.remove('hidden');
accountBtn.classList.add('hidden');
popup.classList.add('hidden');
popup.setAttribute('aria-hidden', 'true');
}
function showOnlySocial(btn) {
    socialGoogle.style.display = 'none';
    socialApple.style.display = 'none';
    socialFacebook.style.display = 'none';
    btn.style.display = 'block';
}
// =============== OPEN FUNCTIONS ===============
function regModalOpen() {
  regModal.classList.remove('hidden');
  regModal.setAttribute('aria-hidden', 'false');
}
function openAccLog() {
accLog.classList.remove('hidden');
accLog.setAttribute('aria-hidden', 'false');
}
function socModalopen (){
socialModal.classList.remove('hidden');
socialModal.setAttribute('aria-hidden', 'false');
}
function showThankYou() {
    thanks.classList.remove('hidden');
    thanks.setAttribute('aria-hidden','false');
}

// =============== CLOSE FUNCTIONS ===============
function closeAccLog() {
  accLog.classList.add('hidden');
  accLog.setAttribute('aria-hidden', 'true');
}
function socModalClose() {
socialModal.classList.add('hidden');
socialModal.setAttribute('aria-hidden', 'true');
}
function regModalClose() {
regModal.setAttribute('aria-hidden','true');
regModal.classList.add('hidden');
}
function closeUniversal() {
  universal.classList.add('hidden');
  universal.setAttribute('aria-hidden', 'true'); 
}
function switchAcc (){
  logIn.classList.add('hidden'); 
  accountBtn.classList.remove('hidden');
}

// =============== EVENT LISTENERS ===============
//открытие кнопки логин
logIn.addEventListener('click',()=>{
openAccLog();
toggleBodyLock();
});
//модалка логин закрывается по клику на крестик 
accClose.addEventListener('click',()=>{
 closeAccLog();
 toggleBodyLock();
 
});
//модалка закрывается по клику на свобобдное пространство 
accOver.addEventListener('click',()=>{
  closeAccLog();
  toggleBodyLock();
});
//окно регистрации 
accGroup.addEventListener('click', (event) => {
    const btn = event.target.closest('a');
    if (!btn) return;
  if(btn.classList.contains('acc__modal-post')){
    regModalOpen();
     closeAccLog();
     toggleBodyLock();
  }
});
  regOver.addEventListener('click',()=>{
  regModalClose();
  toggleBodyLock();
  });
regClose.addEventListener('click',()=>{
 regModalClose();
  toggleBodyLock();
});

checkOut.addEventListener('click', () => {
      // Закрываем регистрацию
    regModalClose();
    toggleBodyLock();
      // Открываем универсальную
    openUniversal();
    const registrationEmail = regModal.querySelector('input[type="email"]');
    const universalEmail = universal.querySelector('input[type="email"]');
     universalEmail.value = registrationEmail.value;
     const registrationName = regModal.querySelector('input[name="name"]');
    currentUser.name = registrationName.value;
    currentUser.email = registrationEmail.value;
    currentUser.provider = 'manual';
});
//закрытие универсальной по крестику 
universalClose.addEventListener('click',()=>{
  closeUniversal();
  toggleBodyLock();
});
//закрытие универсальной по оверлею
universalOver.addEventListener('click',()=>{
  closeUniversal();
  toggleBodyLock();
});
universalBtn.addEventListener('click',(event)=>{
  closeUniversal();
toggleBodyLock();
switchAcc();
if (window._fromCheckout) {
    const price = window._checkoutTotal;
    const priceEl = document.querySelector('.thankyou__price'); 
    priceEl.textContent = `$${price.toFixed(2)}`;
    showThankYou();
    clearCart();
    window._fromCheckout = false;
}

currentUser.email = universalEmail.value;
currentUser.name = "Manual User";
currentUser.provider = "manual";
});
//сделать попап видимым
accountBtn.addEventListener('click',(event)=>{
event.stopPropagation();
const popupName = popup.querySelector('.account-popup__name');
const popupEmail = popup.querySelector('.account-popup__email');
popupName.textContent = `Login: ${currentUser.name}`;
popupEmail.textContent = `Email: ${currentUser.email}`;
popup.classList.remove('hidden');
popup.setAttribute('aria-hidden', 'false'); 
});
//закрыть попап по клику на свободное пространство 
document.addEventListener('click', (event) => {
  const clickedInside = popup.contains(event.target) || accountBtn.contains(event.target);

  if (!clickedInside) {
    popup.classList.add('hidden');
    popup.setAttribute('aria-hidden', 'true'); 
  }
});
logoutBtn.addEventListener('click',()=>{
logoutAcc();
});

alreadyAcc.addEventListener('click',()=>{
openUniversal();
closeAccLog();
    const fakeEmail = 'existing.user@example.com';
    const universalEmail = universal.querySelector('input[type="email"]');
    universalEmail.value = fakeEmail;
    currentUser.email = universalEmail.value;
    currentUser.name = 'Existing User';   
    currentUser.provider = 'manual';
    switchAcc();
});
socialModalBtn.addEventListener('click',(event)=>{
const btn = event.target.closest('a');
if(!btn) return;
if(btn.classList.contains('acc__modal-google')){
  closeAccLog();
  socModalopen();
  showOnlySocial(socialGoogle);
}
else if(btn.classList.contains('acc__modal-apple')){
  closeAccLog();
  socModalopen();
 showOnlySocial(socialApple);

}
else if(btn.classList.contains('acc__modal-facebook')){
  closeAccLog();
  socModalopen();
  showOnlySocial(socialFacebook);

}
});
socialCloseBtn.addEventListener('click',()=>{
socModalClose();
});
socialOverClose.addEventListener('click',()=>{
socModalClose();
});
socialGroup.addEventListener('click', (event) => {
    const btn = event.target.closest('a');
    if (!btn) return;
    if (btn.classList.contains('social__google')) {
currentUser.name = "Google User";
currentUser.email = "google.user@example.com";
currentUser.provider = "google";
socModalClose();
toggleBodyLock(); 
switchAcc();
}
else if (btn.classList.contains('social__apple')) {
currentUser.name = "Apple User";
currentUser.email = "apple.user@example.com";
currentUser.provider = "apple";
socModalClose();
toggleBodyLock(); 
switchAcc();
}
else if (btn.classList.contains('social__facebook')) {
currentUser.name = "Facebook User";
currentUser.email = "facebook.user@example.com";
currentUser.provider = "facebook";
socModalClose();
toggleBodyLock(); 
switchAcc();
}
});
//сделать кнопку неактивной без заполнения полей
const regForm = document.querySelector('.reg__auto');
const regName = regForm.querySelector('input[name="name"]');
const Emailreg = regForm.querySelector('input[name="email"]');
const regTel = regForm.querySelector('input[type="tel"]');
const regPassword = regForm.querySelector('input[name="password"]');
const regConfirm = regForm.querySelector('input[name="confirm-password"]');
const regBtn = regForm.querySelector('.reg-btn');
function handleRegValidation() {
    const nameValid = regName.validity.valid;
    const emailValid = Emailreg.validity.valid;
    const telValid = regTel.validity.valid;
    const passValid = regPassword.validity.valid;
    const confirmValid = regConfirm.validity.valid;
    const passwordsMatch = regPassword.value === regConfirm.value;

    const isValid =
        nameValid &&
        emailValid &&
        telValid &&
        passValid &&
        confirmValid &&
        passwordsMatch;

    regBtn.disabled = !isValid;
}
regForm.addEventListener('input', handleRegValidation);

const loginForm = document.querySelector('.universal__form');
const loginEmail = loginForm.querySelector('input[name="email"]');
const loginPassword = loginForm.querySelector('input[name="password"]');
const loginBtn = document.querySelector('.universal__btn');
function handleLoginValidation() {
    const emailValid = loginEmail.validity.valid;
    const passValid = loginPassword.validity.valid;

    const isValid = emailValid && passValid;

    loginBtn.disabled = !isValid;
}
loginForm.addEventListener('input', handleLoginValidation);

};