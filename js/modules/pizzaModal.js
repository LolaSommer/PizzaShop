import { calculatePrice, sizeMap } from "./state.js";
export function initPizzaModal() {

   //модальное окно 
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const ingredientCards = document.querySelectorAll('.modal__card');
const modalOrderBtn = document.querySelector('.modal__order-btn');
const btnIngredients = document.querySelectorAll('.card__ingredients');
const modalOverlay = document.querySelector('.modal__overlay');
let editingIndex = null;
//объект пицца в модальном окне:размер, тесто, ингредиенты, базовая цена и экстрацена
let modalState = {
  size:10,
  crust:"traditional",
  ingredients:[],
  quantity:1
};
const syncModalToCard = ()=>{
  if(activeCard == null) return;
   const cardState = activeCard._state;
cardState.size = modalState.size;
cardState.quantity = modalState.quantity;
cardState.ingredients = [...modalState.ingredients];
  const newPrice = calculatePrice(cardState);
  const priceElement = activeCard.querySelector('.price__value');
  priceElement.textContent = `${newPrice.toFixed(2)}$`;
  const sizeButtons = activeCard.querySelectorAll('.card__btn button')
  sizeButtons.forEach(btn => btn.classList.remove('active-btn'));
const activeBtn = activeCard.querySelector(`[data-size="${cardState.size}"]`);
activeBtn.classList.add('active-btn');
}
//кнопка ингредиенты 
let activeCard = null;
btnIngredients.forEach((button) => {

  button.addEventListener('click', (event) => {
    const currentCard = button.closest('.menu__card');
     activeCard = currentCard;
    // Обновление контента в модалке
    const cardTitle = currentCard.querySelector('.card__header');
    const modalTitle = modal.querySelector('.ingredients__title');
    modalTitle.textContent = cardTitle.textContent;

    const cardText = currentCard.querySelector('.card__text');
    const modalText = modal.querySelector('.modal__ingredients-text');
    modalText.textContent = cardText.textContent;

    const cardSource = currentCard.querySelector('source');
    const modalSource = modal.querySelector('.modal__img').previousElementSibling;
    modalSource.srcset = cardSource.srcset;
 modalState.size = parseInt(currentCard.querySelector('.active-btn').dataset.size)
modalState.quantity = Number(currentCard.querySelector('.card__count').textContent)
modalState.ingredients = [];
    // Применяем активный размер пиццы из карточки к кнопкам в модалке
    const activeBtn = currentCard.querySelector('.active-btn');
    const modalSizeButtons = modal.querySelectorAll('.modal__radio button');
    modalSizeButtons.forEach(btn => btn.classList.remove('active-btn'));
    if (activeBtn) {
      modalSizeButtons.forEach((modalBtn) => {
        if (modalBtn.dataset.size === activeBtn.dataset.size) {
          modalBtn.classList.add('active-btn');
        }
      });
    }
modalState.size = Number(activeBtn.dataset.size);

   const price = calculatePrice(modalState);  
    updateModalButtonText();
ingredientCards.forEach(card => card.classList.remove('modal__card-value'))

    // Показываем модалку
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal__body-active');
   

  });
});

//крестик закрытия
modalClose.addEventListener('click',(event)=>{
  modalClose.blur();
  syncModalToCard();
  modal.classList.add('hidden');
   modal.setAttribute('aria-hidden','true');
   document.body.classList.remove('modal__body-active');
 

});
//свободное пространство 
modalOverlay.addEventListener('click',()=>{
  modalClose.blur();
  syncModalToCard();
modal.classList.add('hidden');
document.body.classList.remove('modal__body-active');


});

//радио кнопки в модалке
const modalSizeButtons = modal.querySelectorAll('.modal__radio button');
modalSizeButtons.forEach((modalSizeButton)=>{
  modalSizeButton.addEventListener('click',(event)=>{
    modalSizeButtons.forEach(btn => btn.classList.remove('active-btn'));
     modalSizeButton.classList.add('active-btn');
  modalState.size = event.currentTarget.dataset.size
  const price = calculatePrice(modalState);  
updateModalButtonText();

  })
})
//выбор корочки ,теста 
const crustBtns = modal.querySelectorAll('.modal__btn button');
crustBtns.forEach((crustBtn)=>{
  crustBtn.addEventListener('click',(event)=>{
crustBtns.forEach(b=>b.classList.remove('btn-active'));
event.currentTarget.classList.add('btn-active');
modalState.crust = event.currentTarget.dataset.crust;
const price = calculatePrice(modalState);
updateModalButtonText();

  });

});
//кнопки ингредиентов 
ingredientCards.forEach((ingredientCard)=>{ 
  ingredientCard.addEventListener('click',(event)=>{
    const card = event.currentTarget;
    const name = card.dataset.ing;   // <<< ВАЖНО: берём data-ing, а не text

    if (card.classList.contains('modal__card-value')) {
      card.classList.remove('modal__card-value'); 
      modalState.ingredients = modalState.ingredients.filter(item => item !== name);
    } else { 
      card.classList.add('modal__card-value'); 
      modalState.ingredients.push(name);
    }
    const price = calculatePrice(modalState);
   updateModalButtonText();
  });
});


//при нажатии на кнопку заказа в модалке добавить в корзину 
modalOrderBtn.addEventListener('click',()=>{
  if(editingIndex !== null){
if (editingIndex !== null) {
    window._editedItem = {
        index: editingIndex,
        modalState: { ...modalState }
    };
}

  }else{
  window._modalStateForCart = { activeCard, modalState: { ...modalState } };
  resetUI(activeCard);
  } 
  modal.classList.add('hidden');
modal.setAttribute('aria-hidden', 'true');
document.body.classList.remove('modal__body-active');

});
  

const resetUI = (activeCard) => {
    if (editingIndex !== null) {
    return;
  }
 if (activeCard) {
    // сброс для карточки меню
    const cardState = activeCard._state;
    cardState.size = 10;
    cardState.quantity = 1;
    cardState.ingredients = [];

    const count = activeCard.querySelector('.card__count');
    const radio = activeCard.querySelectorAll('.card__btn button');
    const priceCard = activeCard.querySelector('.price__value');
    const defaultSizeBtn = activeCard.querySelector('[data-size="10"]');

    count.textContent = 1;
    radio.forEach(b => b.classList.remove('active-btn'));
    defaultSizeBtn.classList.add('active-btn');

    const newPrice = calculatePrice(cardState);
    priceCard.textContent = `${newPrice.toFixed(2)}$`;
}

// сброс модалки
modalState.quantity = 1;
modalState.size = 10;
modalState.ingredients = [];
modalState.crust = "traditional";

const radioModal = modal.querySelectorAll('.modal__radio button');
const cardModal = modal.querySelectorAll('.modal__card');
const btnModal = modal.querySelectorAll('.modal__btn button');
const modalDefBtn = modal.querySelector('[data-size="10"]');

radioModal.forEach(b => b.classList.remove('active-btn'));
modalDefBtn.classList.add('active-btn');

cardModal.forEach(card => card.classList.remove('modal__card-value'));
btnModal.forEach(crustBtn => crustBtn.classList.remove('btn-active'));
updateModalButtonText();
};
const updateModalButtonText = () =>{
 
  if(editingIndex !== null){
 modalOrderBtn.textContent = `Save Changes ${calculatePrice(modalState).toFixed(2)}$`;
  }else{
     modalOrderBtn.textContent = `Grab Your Slice ${calculatePrice(modalState).toFixed(2)}$`;
  }
}
//кнопка изменить в модалке 

document.addEventListener("click", () => {
    if (!window._editItem) return;

    const { item, index } = window._editItem;

    editingIndex = index;

    // открываем модалку
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal__body-active');

    // подставляем данные
    modalState.size = item.size;
    modalState.quantity = item.quantity;
    modalState.crust = item.crust;
    modalState.ingredients = [...item.ingredients];
    // Синхронизация DOM ингредиентов с modalState
const ingCards = modal.querySelectorAll('.modal__card');
ingCards.forEach(card => {
    const ing = card.dataset.ing;
    if (modalState.ingredients.includes(ing)) {
        card.classList.add('modal__card-value');
    } else {
        card.classList.remove('modal__card-value');
    }
});
// 🔥 Синхронизация SIZE-кнопок
const sizeButtons = modal.querySelectorAll('.modal__radio button');
sizeButtons.forEach(btn => btn.classList.remove('active-btn'));

const activeSizeBtn = modal.querySelector(`.modal__radio button[data-size="${modalState.size}"]`);
if (activeSizeBtn) activeSizeBtn.classList.add('active-btn');
// CRUST — синхронизация кнопок
const crustButtons = modal.querySelectorAll('.modal__btn button');
crustButtons.forEach(btn => btn.classList.remove('btn-active'));

const correctCrust = modal.querySelector(`.modal__btn button[data-crust="${modalState.crust}"]`);
if (correctCrust) correctCrust.classList.add('btn-active');


    // Обновляем UI модалки: название, картинку, текст
const modalTitle = modal.querySelector('.ingredients__title');
modalTitle.textContent = item.title;

const modalImg = modal.querySelector('.modal__img');
modalImg.src = item.img;
modalImg.alt = item.alt;

const modalSource = modal.querySelector('.modal__img').previousElementSibling;
modalSource.srcset = item.img;

const modalText = modal.querySelector('.modal__ingredients-text');
modalText.textContent = "";


    // UI
    updateModalButtonText();

    window._editItem = null;
});

}

