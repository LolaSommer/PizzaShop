//карточка товара
const cards = document.querySelectorAll('.menu__card'); 
let cartItems = [];
const cartTotal = document.querySelector('.cart__total');
cards.forEach((card)=>{

//кнопка оформления заказа

const order = card.querySelector('.card__order');
  const cardState = {
    size: 10,
    quantity: 1,
    ingredients: [],
    crust: "traditional"
  };
card._state = cardState;

 //обновление цены,кол-ва, размера при нажатии на кнопку 
 order.addEventListener('click',()=>{ 
  const item = createItemFromCard(card, card._state);
  addToCart(item);
   resetUI(card);
 });

 //переменные счетчик пицц + и -
  const minus = card.querySelector('.card__minus');
  const count = card.querySelector('.card__count');
  const priceElement = card.querySelector('.price__value');
cardState.quantity = +count.textContent;
  card.addEventListener('click',(event)=>{
    event.preventDefault();
    let value = +count.textContent;
    if(event.target.classList.contains('card__plus')){
      value=value+1;
       count.textContent=value;
    cardState.quantity = value;
     const price = calculatePrice(cardState);
      priceElement.textContent = `${price.toFixed(2)}$`;
    }
    else if(event.target.classList.contains('card__minus') && value>0){
      value=value-1;
      count.textContent=value;
    cardState.quantity = value;
    const price = calculatePrice(cardState);
    priceElement.textContent = `${price.toFixed(2)}$`;

    }
   
  });
  //кнопки выбора размера пиццы
const sizeButtons = card.querySelectorAll('.card__btn button');
sizeButtons.forEach((btn)=>{
btn.addEventListener('click',(event)=>{
  sizeButtons.forEach(b=>b.classList.remove('active-btn'));
  event.currentTarget.classList.add('active-btn');
cardState.size = event.currentTarget.dataset.size;
cardState.quantity = 1;
count.textContent = 1;
  const price = calculatePrice(cardState);
priceElement.textContent = `${price.toFixed(2)}$`;

});
})
if (cardState.size && cardState.quantity > 0) {
  order.disabled = false;
}
});

