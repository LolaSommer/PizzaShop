export function initFilter() {
   //меню фильтрации 
const menuFilter = document.querySelector('.menu__filter');
menuFilter.addEventListener('click',(event)=>{
const btn = event.target.closest('.menu__item');
if(!btn)return;
const category = btn.dataset.filter;
const btns = document.querySelectorAll('.menu__item');
btns.forEach(l => l.classList.remove('btn-active'));
btn.classList.add('btn-active');
const menuCards = document.querySelectorAll('.menu__card');
menuCards.forEach(card => {
    if (category === "all") {
        card.classList.remove("hidden");
    } else if (card.dataset.category === category) {
        card.classList.remove("hidden");
    } else {
        card.classList.add("hidden");
    }
});
}); 
}

