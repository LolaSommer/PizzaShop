import { calculatePrice, sizeMap } from "./state.js";
import { toggleBodyLock } from "./modal-lock.js";
import { updateCartItem } from "./cart.js";
let pendingEdit = null;

export const startEditMode = (item, index) => {
    pendingEdit = { item, index };
};

export function initPizzaModal() {
/* =======================
    SELECTORS
======================= */ 
   //модальное окно 
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const ingredientCards = document.querySelectorAll('.modal__card');
const modalOrderBtn = document.querySelector('.modal__order-btn');
const btnIngredients = document.querySelectorAll('.card__ingredients');
const modalOverlay = document.querySelector('.modal__overlay');
const cartModal = document.querySelector('.cart__modal');
const modalSizeButtons = modal.querySelectorAll('.modal__radio button');
const crustBtns = modal.querySelectorAll('.modal__btn button');
const modalCount = modal.querySelector('.modal__count');
/* ===== STATE ===== */
let editingIndex = null;

//объект пицца в модальном окне:размер, тесто, ингредиенты, базовая цена и экстрацена
let modalState = {
  size:10,
  crust:"traditional",
  ingredients:[],
  quantity:1
};
/* ===== UI HELPERS ===== */
const updateModalButtonText = () =>{
  if(editingIndex !== null){
 modalOrderBtn.textContent = `Save Changes ${calculatePrice(modalState).toFixed(2)}$`;
  }else{
     modalOrderBtn.textContent = `Grab Your Slice ${calculatePrice(modalState).toFixed(2)}$`;
  }
}
const resetUI = () => {

    // сброс ингредиентов
    ingredientCards.forEach(card => card.classList.remove('modal__card-value'));

    // сброс размеров
    modalSizeButtons.forEach(btn => btn.classList.remove('active-btn'));

    // сброс корок
    crustBtns.forEach(btn => btn.classList.remove('btn-active'));

    // сброс количества в модалке
    if (modalCount) modalCount.textContent = 1;
};

const setModalSize = (size) => {
    modalState.size = size;

    modalSizeButtons.forEach(btn => {
        btn.classList.toggle('active-btn', btn.dataset.size === String(size));
    });

    calculatePrice(modalState);
    updateModalButtonText();
};
const toggleIngredient = (name) => {
  if (modalState.ingredients.includes(name)) {
    modalState.ingredients = modalState.ingredients.filter(item => item !== name);
  } 
  else {
    modalState.ingredients.push(name);
  }
};
const updateIngredientCardUI = (card, name) => {
  if (modalState.ingredients.includes(name)) {
    card.classList.add('modal__card-value');
  } else {
    card.classList.remove('modal__card-value');
  }
};
const setModalCrust = (crust) => {
    modalState.crust = crust;
    crustBtns.forEach(btn => {
        btn.classList.toggle('btn-active', btn.dataset.crust === crust);
    });
    calculatePrice(modalState);
    updateModalButtonText();
};
const openModal = () => {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    toggleBodyLock();
};
const closeModal = () => {
modal.classList.add('hidden');
modal.setAttribute('aria-hidden', 'true');
toggleBodyLock();
}
function openModalUnified(pizzaData) {
modalState.size = pizzaData.size;
window._pizzaData = pizzaData;
modalState.crust = pizzaData.crust;
modalState.ingredients = [...pizzaData.ingredients];
modalState.quantity = pizzaData.quantity;
if (pizzaData.source === "cart") {
    editingIndex = pizzaData.index;
}
fillModalUIFromData(pizzaData);
updateModalUIFromState();
openModal();

}
function fillModalUIFromData(pizzaData) {
   const modalTitle = modal.querySelector('.ingredients__title').textContent = pizzaData.title;
    const modalImg = modal.querySelector('.modal__img');
    modalImg.src = pizzaData.img;
    modalImg.alt = pizzaData.alt;
     const modalText = modal.querySelector('.modal__ingredients-text');
    modalText.textContent = pizzaData.description || "";
     const modalSource = modalImg.previousElementSibling;
    modalSource.srcset = pizzaData.img;
}
const updateModalUIFromState = () => {
    // size
    setModalSize(modalState.size);
    // crust
    setModalCrust(modalState.crust);
    // ingredients
    ingredientCards.forEach(card => {
        const ing = card.dataset.ing;
        updateIngredientCardUI(card, ing);
    });
    // price + text
    updateModalButtonText();
};
const extractFromCard = (card) =>{
  const title = card.querySelector(".card__header").textContent;
  const description = card.querySelector(".card__text").textContent;
   const img = card.querySelector("img").src;
   const size =card.querySelector(".active-btn").dataset.size;
  return {
      source: "card",
      title,
      description,
      img,
      size,
      crust: "traditional",
      ingredients: [],
      quantity: 1,
      index: null
   }
}
const extractFromCartItem = (item,index) =>{
 const title = item.title;
 const  description = item.description;
  const img = item.img;
 const size = item.size;
  const crust = item.crust;
 const ingredients = item.ingredients;
 const quantity = item.quantity;
 return {
   source: "cart",
    title:item.title,
    description: item.description,
    img: item.img,
    size: item.size,
    crust: item.crust,
    ingredients: [...item.ingredients],
    quantity: item.quantity,
    index
 }
}
function createItemFromState(modalState, pizzaData) {
    return {
        img: pizzaData.img,
        alt: pizzaData.title,
        title: pizzaData.title,
        description: pizzaData.description,
        size: modalState.size,
        crust: modalState.crust,
        ingredients: [...modalState.ingredients],
        quantity: modalState.quantity,
        price: calculatePrice(modalState)
    };
}


//кнопка ингредиенты 
btnIngredients.forEach((button) => {
  button.addEventListener('click', () => {
    const currentCard = button.closest('.menu__card');
    openModalUnified( extractFromCard(currentCard) )
  });
});

//крестик закрытия
modalClose.addEventListener('click',(event)=>{
  modalClose.blur();
 closeModal();
});
//свободное пространство 
modalOverlay.addEventListener('click',()=>{
  modalClose.blur();
closeModal();
});

//радио кнопки в модалке
modalSizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setModalSize(btn.dataset.size);
    });
});

//выбор корочки ,теста 
crustBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setModalCrust(btn.dataset.crust);
    });
});

//кнопки ингредиентов 
ingredientCards.forEach((ingredientCard)=>{ 
  ingredientCard.addEventListener('click',(event)=>{
    const card = event.currentTarget;
    const name = card.dataset.ing;
    toggleIngredient(name);
    updateIngredientCardUI(card, name);
    updateModalButtonText();
  });
});

//при нажатии на кнопку заказа в модалке добавить в корзину 
modalOrderBtn.addEventListener('click', () => {

  // 🔥 1. Режим редактирования
if (editingIndex !== null) {
    const newItem = createItemFromState(modalState, window._pizzaData);
    updateCartItem(editingIndex, newItem);
    editingIndex = null;
}
  else {
const item = createItemFromState(modalState, window._pizzaData);
window._createdItemForCart = item;
    resetUI();
  }
  // 🔥 3. Закрываем модалку
 closeModal();

  if (!cartModal.classList.contains('hidden')) {
    toggleBodyLock();
  }
});

//кнопка изменить в модалке 
document.addEventListener("click", (event) => {
    if (!pendingEdit) return;
    const changeBtn = event.target.closest('.cart__modal-change');
    if (!changeBtn) return;

    const { item, index } = pendingEdit;
    openModalUnified( extractFromCartItem(item, index));

});

}

