import { calculatePrice, sizeMap } from "./state.js";
import { initCart } from "./cart.js"; 
import { addToCart } from "./cart.js";
export function initMenu() {
  const cards = document.querySelectorAll('.menu__card');

cards.forEach((card) => {
  // 1) состояние карточки
  const cardState = {
    size: 10,
    quantity: 1,
    ingredients: [],
    crust: "traditional",
  };
  card._state = cardState;

  // 2) кнопка заказа
  const order = card.querySelector('.card__order');
  order.addEventListener('click', (event) => {
    event.preventDefault();

    const item = {
        img: card.querySelector("img").src,
        alt: card.querySelector("img").alt,
        title: card.querySelector(".card__header").textContent,
        size: card._state.size,
        crust: card._state.crust,
        ingredients: [...card._state.ingredients],
        quantity: card._state.quantity,
        price: calculatePrice(card._state)
    };

    addToCart(item);

    document.dispatchEvent(new CustomEvent("resetCard", { detail: { card } }));
});

  // 3) плюс/минус + пересчёт цены
  const count = card.querySelector('.card__count');
  const priceElement = card.querySelector('.price__value');

  cardState.quantity = +count.textContent;

  card.addEventListener('click', (event) => {
    event.preventDefault();
    let value = +count.textContent;

    if (event.target.classList.contains('card__plus')) {
      value = value + 1;
      count.textContent = value;
      cardState.quantity = value;
      const price = calculatePrice(cardState);
      priceElement.textContent = `${price.toFixed(2)}$`;
    } else if (
      event.target.classList.contains('card__minus') &&
      value > 0
    ) {
      value = value - 1;
      count.textContent = value;
      cardState.quantity = value;
      const price = calculatePrice(cardState);
      priceElement.textContent = `${price.toFixed(2)}$`;
    }
  });

  // 4) переключение размера
  const sizeButtons = card.querySelectorAll('.card__btn button');
  sizeButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      sizeButtons.forEach((b) => b.classList.remove('active-btn'));
      event.currentTarget.classList.add('active-btn');
      cardState.size = event.currentTarget.dataset.size;
      cardState.quantity = 1;
      count.textContent = 1;
      const price = calculatePrice(cardState);
      priceElement.textContent = `${price.toFixed(2)}$`;
    });
  });
});
// =======================
// СБРОС КАРТОЧЕК ПО resetCard
// =======================
document.addEventListener("resetCard", (event) => {
  const card = event.detail.card;
  const state = card._state;

  // сброс данных
  state.size = 10;
  state.quantity = 1;
  state.ingredients = [];

  // UI
  const count = card.querySelector(".card__count");
  const sizeButtons = card.querySelectorAll(".card__btn button");
  const priceElement = card.querySelector(".price__value");

  count.textContent = 1;

  sizeButtons.forEach((btn) => btn.classList.remove("active-btn"));
  const defaultBtn = card.querySelector('[data-size="10"]');
  if (defaultBtn) defaultBtn.classList.add("active-btn");

  const newPrice = calculatePrice(state);
  priceElement.textContent = `${newPrice.toFixed(2)}$`;
});

}

