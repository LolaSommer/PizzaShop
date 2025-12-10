import { toggleBodyLock } from "./modal-lock.js";
export function initBlog() {
    //подсветка ссылок меню 
const navSelf = document.querySelectorAll('.nav__self');
const section = document.querySelectorAll('section');
navSelf.forEach(link=>{
    link.addEventListener('click',(event)=>{
        event.preventDefault();
       navSelf.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
  const hrefValue = link.getAttribute('href');
  const targetId = hrefValue.substring(1);
  document.getElementById(targetId)
          .scrollIntoView({ behavior: 'smooth' });
    });
});
function updateOnScroll() {
    const scrollY = window.scrollY + window.innerHeight / 2;

    let activeSection = null;

    section.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            activeSection = section;
        }
    });

    if (!activeSection) return;

    navSelf.forEach(link => {
        link.classList.remove('active');
        const hrefValue = link.getAttribute('href');
        const targetId = hrefValue.substring(1);
        if (targetId === activeSection.id) {
            link.classList.add('active');
        }
    });
}
 window.addEventListener('scroll', updateOnScroll);
updateOnScroll();
//кнопки действия и открытие модалок 
//селекторы
const ctas = document.querySelectorAll('[data-action]');
const tourModal = document.querySelector('.tour__modal');
const tourClose = document.querySelector('.tour__close');
const tourOver = document.querySelector('.tour__overlay');
const tourBtn = tourModal.querySelector('.tour__btn');
const meetModal = document.querySelector('.meet__modal');
const meetClose = document.querySelector('.meet__close');
const meetOver = document.querySelector('.meet__overlay');
const meetOk = document.querySelector('.meet__btn');
const netModal = document.querySelector('.net__modal');
const tourInputs = tourModal.querySelectorAll('.tour__input');
tourInputs.forEach(input => {
    input.addEventListener('input', checkTourForm);
});

function checkTourForm() {
    let allValid = true;
    tourInputs.forEach(input => {
        if (!input.validity.valid) {
            allValid = false;
        }
    });
    if (allValid) {
        tourBtn.disabled = false;
        tourBtn.classList.remove('disabled');
    } else {
        tourBtn.disabled = true;
        tourBtn.classList.add('disabled');
    }
}

function openModal(modal) {
 modal.classList.remove('hidden');
 modal.setAttribute('aria-hidden', 'false');
toggleBodyLock();
}
function closeModal(modal) {
modal.classList.add('hidden');
 modal.setAttribute('aria-hidden', 'true');
toggleBodyLock();
}

//кнопки действия 
ctas.forEach(btn =>{
    btn.addEventListener('click',()=>{
        const action = btn.dataset.action;
        if(action === "social"){
        
        if(!netModal)return;
        openModal(netModal);
        }
        if(action === "tour"){
            if(!tourModal)return;
            openModal(tourModal);
            checkTourForm();
            }
        if (action === "crew") {
        if (!tourModal) return;
         const title = tourModal.querySelector('.tour__title');
         title.textContent = "Meet the Crew";
        openModal(tourModal);
        checkTourForm();
        }
        if(action === "main"){
            window.location.href = "index.html#pizza";
        }
    });
});
const tourTriggers = [tourClose, tourOver];
const meetTriggers = [meetClose, meetOver, meetOk];
const openMeetTriggers = [tourBtn];
openMeetTriggers.forEach(el => {
    el.addEventListener('click', () => {
        closeModal(tourModal);
        openModal(meetModal);
    });
});

tourTriggers.forEach(el => {
  el.addEventListener('click', () => closeModal(tourModal));
});

meetTriggers.forEach(el => {
  el.addEventListener('click', () => closeModal(meetModal));
});

}