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
let activeCard = null;
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
const fillModalUIFromCard = (card) => {
    // title
    const title = card.querySelector('.card__header').textContent;
    modal.querySelector('.ingredients__title').textContent = title;

    // description
    const text = card.querySelector('.card__text').textContent;
    modal.querySelector('.modal__ingredients-text').textContent = text;

    // image (source + img)
    const cardSource = card.querySelector('source');
    const modalPictureSource = modal.querySelector('.modal__img').previousElementSibling;
    modalPictureSource.srcset = cardSource.srcset;

    const modalImg = modal.querySelector('.modal__img');
    modalImg.src = card.querySelector('img').src;
    modalImg.alt = card.querySelector('img').alt;

    // reset ingredient UI
    ingredientCards.forEach(c => c.classList.remove('modal__card-value'));
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
const openModalFromCard = (currentCard) => {
    loadStateFromCard(currentCard);      // state из карточки
    fillModalUIFromCard(currentCard);    // title, img, text
    updateModalUIFromState();            // size, crust, ingredients, price
    openModal();                         // открыть окно
};

const fillModalUIFromItem = (item) => {
    modal.querySelector('.ingredients__title').textContent = item.title;

    const modalImg = modal.querySelector('.modal__img');
    modalImg.src = item.img;
    modalImg.alt = item.alt;

    const modalSource = modalImg.previousElementSibling;
    modalSource.srcset = item.img;

    // Синхронизация ингредиентов
    ingredientCards.forEach(card => {
        const ing = card.dataset.ing;
        updateIngredientCardUI(card, ing);
    });
};
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
//LOGIK//
const loadStateFromCard = (card) => {
    // размер
    const sizeBtn = card.querySelector('.active-btn');
    modalState.size = Number(sizeBtn.dataset.size);
    // количество
    modalState.quantity = Number(card.querySelector('.card__count').textContent);
    // ингредиенты — при открытии из карточки их нет
    modalState.ingredients = [];
    // корка (если всегда по умолчанию)
    modalState.crust = "traditional";
};
const loadStateFromItem = (item) => {
    modalState.size = item.size;
    modalState.quantity = item.quantity;
    modalState.crust = item.crust;
    modalState.ingredients = [...item.ingredients];
};
const openModalFromItem = (item, index) => {
    editingIndex = index;
    loadStateFromItem(item);     
    fillModalUIFromItem(item);
    updateModalUIFromState();
    openModal();                     
};
//кнопка ингредиенты 
btnIngredients.forEach((button) => {
  button.addEventListener('click', () => {
    const currentCard = button.closest('.menu__card');
    activeCard = currentCard;
    openModalFromCard(currentCard);
  });
});

//крестик закрытия
modalClose.addEventListener('click',(event)=>{
  modalClose.blur();
  syncModalToCard();
 closeModal();
 if (!cartModal.classList.contains('hidden')) {
    toggleBodyLock();
}


});
//свободное пространство 
modalOverlay.addEventListener('click',()=>{
  modalClose.blur();
  syncModalToCard();
closeModal();
toggleBodyLock();
if (!cartModal.classList.contains('hidden')) {
    toggleBodyLock();
}

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
        const newItem = {
        ...pendingEdit.item,
        size: modalState.size,
        quantity: modalState.quantity,
        crust: modalState.crust,
        ingredients: [...modalState.ingredients],
        price: calculatePrice(modalState)
    };

    updateCartItem(editingIndex, newItem);
    editingIndex = null;

  }

  else {
    window._modalStateForCart = { activeCard, modalState: { ...modalState } };
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
    openModalFromItem(item, index);
});

}

