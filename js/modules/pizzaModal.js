import { calculatePrice, sizeMap } from "./state.js";
import { toggleBodyLock } from "./modal-lock.js";
import { updateCartItemByKey, addToCart } from "./cart.js";

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const ingredientCards = document.querySelectorAll('.modal__card');
const modalOrderBtn = document.querySelector('.modal__order-btn');
const btnIngredients = document.querySelectorAll('.card__ingredients');
const modalOverlay = document.querySelector('.modal__overlay');
const cartModal = document.querySelector('.cart__modal');
const modalSizeButtons = modal ? modal.querySelectorAll('.modal__radio button') : [];
const crustBtns = modal ? modal.querySelectorAll('.modal__btn button') : [];
const modalCount = modal ? modal.querySelector('.modal__count') : null;

let editingKey = null;
let editingBaseItem = null;
let modalState = {
  size: 10,
  crust: "traditional",
  ingredients: [],
  quantity: 1
};

export function openEditModal(key, item) {
  editingKey = key;
  editingBaseItem = item;
  modalState.size = item.size;
  modalState.crust = item.crust;
  modalState.ingredients = [...item.ingredients];
  modalState.quantity = item.quantity;
  fillModalUIFromData(item);
  updateModalUIFromState();
  openModal();
}

export function fillModalUIFromData(pizzaData) {
  if (!modal) return;
  
  const modalTitle = modal.querySelector('.ingredients__title');
  if (modalTitle) modalTitle.textContent = pizzaData.title;
  
  const modalImg = modal.querySelector('.modal__img');
  if (modalImg) {
    modalImg.src = pizzaData.img;
    modalImg.alt = pizzaData.alt;
  }
  
  const modalText = modal.querySelector('.modal__ingredients-text');
  if (modalText) modalText.textContent = pizzaData.description || "";
  
  const modalSource = modalImg ? modalImg.previousElementSibling : null;
  if (modalSource && modalSource.tagName === 'SOURCE') {
    modalSource.srcset = pizzaData.img;
  }
}

export function updateModalUIFromState() {
  if (!modal) return;
  
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

export function setModalCrust(crust) {
  modalState.crust = crust;
  crustBtns.forEach(btn => {
    btn.classList.toggle('btn-active', btn.dataset.crust === crust);
  });
  calculatePrice(modalState);
  updateModalButtonText();
};

export function updateIngredientCardUI(card, name) {
  if (modalState.ingredients.includes(name)) {
    card.classList.add('modal__card-value');
  } else {
    card.classList.remove('modal__card-value');
  }
};

export function setModalSize(size) {
  modalState.size = size;

  modalSizeButtons.forEach(btn => {
    btn.classList.toggle('active-btn', btn.dataset.size === String(size));
  });

  calculatePrice(modalState);
  updateModalButtonText();
};

export function updateModalButtonText() {
  if (!modalOrderBtn) return;
  
  if (editingKey !== null) {
    modalOrderBtn.textContent = `Save Changes ${calculatePrice(modalState).toFixed(2)}$`;
  } else {
    modalOrderBtn.textContent = `Grab Your Slice ${calculatePrice(modalState).toFixed(2)}$`;
  }
}

export function openModal() {
  if (!modal) return;
  
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  toggleBodyLock();
};

export function initPizzaModal() {
  // Проверяем, есть ли модальное окно пиццы на странице
  if (!modal) {
    console.log('Pizza modal not found on this page');
    return;
  }

  /* ===== UI HELPERS ===== */

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

  const toggleIngredient = (name) => {
    if (modalState.ingredients.includes(name)) {
      modalState.ingredients = modalState.ingredients.filter(item => item !== name);
    } else {
      modalState.ingredients.push(name);
    }
  };

  const closeModal = () => {
    if (!modal) return;
    
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
    fillModalUIFromData(pizzaData);
    updateModalUIFromState();
    openModal();
  }

  const extractFromCard = (card) => {
    const title = card.querySelector(".card__header").textContent;
    const description = card.querySelector(".card__text").textContent;
    const img = card.querySelector("img").src;
    const size = card.querySelector(".active-btn").dataset.size;
    return {
      source: "card",
      title,
      description,
      img,
      size,
      crust: "traditional",
      ingredients: [],
      quantity: 1
    }
  }

  function createItemFromState(modalState, baseItem) {
    const ingredientsKey = [...modalState.ingredients]
      .sort()
      .join('_');
    const key = `${baseItem.title}|${modalState.size}|${modalState.crust}|${ingredientsKey}`;
    return {
      key,
      title: baseItem.title,
      img: baseItem.img,
      description: baseItem.description,
      size: modalState.size,
      crust: modalState.crust,
      ingredients: [...modalState.ingredients],
      quantity: modalState.quantity,
      price: calculatePrice(modalState, baseItem)
    };
  }

  //кнопка ингредиенты 
  btnIngredients.forEach((button) => {
    button.addEventListener('click', () => {
      const currentCard = button.closest('.menu__card');
      openModalUnified(extractFromCard(currentCard));
    });
  });

  //крестик закрытия
  if (modalClose) {
    modalClose.addEventListener('click', (event) => {
      modalClose.blur();
      closeModal();
    });
  }

  //свободное пространство 
  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      if (modalClose) modalClose.blur();
      closeModal();
    });
  }

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
  ingredientCards.forEach((ingredientCard) => {
    ingredientCard.addEventListener('click', (event) => {
      const card = event.currentTarget;
      const name = card.dataset.ing;
      toggleIngredient(name);
      updateIngredientCardUI(card, name);
      updateModalButtonText();
    });
  });

  //при нажатии на кнопку заказа в модалке добавить в корзину 
  if (modalOrderBtn) {
    modalOrderBtn.addEventListener('click', () => {
      // 🔥 1. Режим редактирования
      if (editingKey !== null) {
        const newItem = createItemFromState(modalState, editingBaseItem);
        updateCartItemByKey(editingKey, newItem);
        editingKey = null;
        editingBaseItem = null;
      } else {
        const item = createItemFromState(modalState, window._pizzaData);
        addToCart(item);
        resetUI();
      }
      // 🔥 3. Закрываем модалку
      closeModal();

      if (cartModal && !cartModal.classList.contains('hidden')) {
        toggleBodyLock();
      }
    });
  }
}
