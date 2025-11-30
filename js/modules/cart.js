//корзина 
const cart = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart__modal');
const cartModalOverlay = document.querySelector('.cart__modal-overlay');
const cartClose = document.querySelector('.cart__modal-close');
//корзина открывается , открывается оверлей на всем свободном пространстве 
cart.addEventListener('click',()=>{
  cartModal.classList.remove('hidden');
  cartModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal__body-active');
  cartModalOverlay.classList.remove('hidden');
   renderCart();
});
//корзина закрывается по клику на крестик 
cartClose.addEventListener('click',()=>{
cartModal.classList.add('hidden');
 cartModal.setAttribute('aria-hidden','true');
 document.body.classList.remove('modal__body-active');
 cartModalOverlay.classList.add('hidden');
});
//корзина закрывается по клику на свобобдное пространство 
cartModalOverlay.addEventListener('click',()=>{
  cartModal.classList.add('hidden');
  cartModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal__body-active');
  cartModalOverlay.classList.add('hidden');
});

//добавление карточки товара экстра в корзину
const generateCartItem = (item,index)=>{
  if(item.type === "extra"){
    return `<div class="cart__modal-item" data-index="${index}">

  <div class="cart__modal-wrapper">
    <div class="cart__modal-pic">
      <picture class="card__modal-pizzapic">
    <source srcset="${item.img}" type="image/webp">
      <img class="modal__img" src="${item.img}" alt="${item.alt}">
      </picture>
    </div>

    <div class="cart__modal-info">
      <div class="cart__modal-pizza">${item.title}</div>
      <div class="cart__modal-details">Add-on item</div>
      <div class="cart__modal-ingredients"></div>

    </div>
  </div>

  <div class="cart__modal-counter">
    <div class="cart__modal-price">${item.price.toFixed(2)}$</div>
    <div class="cart__modal-radiogroup">
      <button class="cart__modal-change hidden">change</button>
      <div class="cart__modal-left">-</div>
      <div class="cart__modal-count">${item.quantity}</div>
      <div class="cart__modal-right">+</div>
      <div class="cart__modal-remove">
  <svg class="icon-trash">
    <use href="img/sprite.svg#icon-trash"></use>
  </svg>
      </div>
    </div>
  </div>

</div>
`;

  }
 else{
  //добавление карточки товара пиццы в корзину
return `
<div class="cart__modal-item" data-index="${index}">

  <div class="cart__modal-wrapper">
    <div class="cart__modal-pic">
      <picture class="card__modal-pizzapic">
    <source srcset="${item.img}" type="image/webp">
      <img class="modal__img" src="${item.img}" alt="${item.alt}">
      </picture>
    </div>

    <div class="cart__modal-info">
      <div class="cart__modal-pizza">${item.title}</div>
      <div class="cart__modal-details">
    ${sizeMap[item.size].inches} ${sizeMap[item.size].label} — ${item.crust} crust</div>
      <div class="cart__modal-ingredients">${item.ingredients.join(', ')}</div>

    </div>
  </div>

  <div class="cart__modal-counter">
    <div class="cart__modal-price">${item.price.toFixed(2)}$</div>
    <div class="cart__modal-radiogroup">
      <button class="cart__modal-change">change</button>
      <div class="cart__modal-left">-</div>
      <div class="cart__modal-count">${item.quantity}</div>
      <div class="cart__modal-right">+</div>
      <div class="cart__modal-remove">
  <svg class="icon-trash">
    <use href="img/sprite.svg#icon-trash"></use>
  </svg>
      </div>
    </div>
  </div>

</div>
`;

 }


};
//подтягивание контента из карточки в корзину
const createItemFromCard = (card,state) =>{
const item ={
  img:"",
  alt:"",
  title:"",
  size:0,
  crust:"",
  ingredients:[],
  quantity:0,
  price:0
}
const imgEl = card.querySelector('img');
item.img = imgEl.src;
item.alt = imgEl.alt;
item.title = card.querySelector('.card__header').textContent;
item.size = state.size
item.crust = state.crust
item.quantity = state.quantity
item.ingredients = [...state.ingredients]
item.price = calculatePrice(state)
return item;

};
function isSamePizza(item1, item2) {
   if(item1.title !== item2.title ||
    item1.size !== item2.size ||
    item1.crust !== item2.crust ||
    item1.ingredients.length !== item2.ingredients.length
   ){
    return false;
   }
   const sortedIngr1 = [...item1.ingredients].sort();
   const sortedIngr2 = [...item2.ingredients].sort();
   for(let i =0;i<sortedIngr1.length;i++){
    if(sortedIngr1[i] !== sortedIngr2[i]){
      return false;
    }
   }
     return true;
};
//добавление товара экстра в корзину
const addToCart = (item) => {
  const existingItem = cartItems.find(cartItem => 
    isSamePizza(item, cartItem)
  );
  if (existingItem) {
    existingItem.quantity += item.quantity;
    existingItem.price = calculatePrice(existingItem);
    return renderCart();
  }
  cartItems.push(item);
  renderCart();
};
const renderCart = () =>{
const container = document.querySelector('.cart__modal-items');
container.innerHTML = '';
const totalHTML = cartItems.reduce((acc, item, index) => {
    return acc + generateCartItem(item,index);
}, '');

container.innerHTML = totalHTML;
total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
cartTotal.textContent = total;
const cartTotalPrice = document.querySelector('.cart__modal-total');
let totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
const numberElement = document.querySelector('.cart__modal-number');
const word = total === 1?'item':'items';
numberElement.textContent = `${total} ${word}`;
const checkoutBtn = document.querySelector('.cart__modal-checkout');
if(cartItems.length === 0){
  checkoutBtn.disabled = true;
  checkoutBtn.classList.add('disabled');
}
else{
  checkoutBtn.disabled = false;
  checkoutBtn.classList.remove('disabled');
}
const empty = document.querySelector('.cart__modal-empty');
const title = document.querySelector('.cart__modal-title');
const cartList = document.querySelector('.cart__modal-items');
const extras = document.querySelector('.cart__modal-extras');
const bottom = document.querySelector('.cart__modal-bottom');
const extraTitle = document.querySelector('.cart__modal-extrastitle');
extraCards = document.querySelectorAll('.cart__modal-extra');
const hiddenCount = [...extraCards].filter(ex => ex.classList.contains('hidden')).length;
const totalCount = extraCards.length;
if(hiddenCount === totalCount){
  extraTitle.classList.add('hidden');
  extras.classList.add('hidden');
}else{
  extraTitle.classList.remove('hidden');
  extras.classList.remove('hidden');
}
if(cartItems.length === 0){
  empty.classList.remove('hidden');
  extraTitle.classList.add('hidden');
  title.classList.add('hidden');
  cartList.classList.add('hidden');
  extras.classList.add('hidden');
  bottom.classList.add('hidden');
  return;
}else{
   empty.classList.add('hidden');
  title.classList.remove('hidden');
  cartList.classList.remove('hidden');
  bottom.classList.remove('hidden');
}
};

const container = document.querySelector('.cart__modal-items');
container.addEventListener('click',(event)=>{
 const removeBtn = event.target.closest('.cart__modal-remove');
if(event.target.classList.contains('cart__modal-right')){
const parent = event.target.closest('.cart__modal-item')
const idxString = parent.dataset.index;
const index = Number(idxString);
const item = cartItems[index];
if(item.type === "extra"){
  item.quantity=item.quantity+1;
  item.price = item.basePrice * item.quantity;
  renderCart();
} else{
item.quantity=item.quantity+1;
item.price = calculatePrice(item);
renderCart();
total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
cartTotal.textContent = total;}
}

else if (removeBtn){
const parent = event.target.closest('.cart__modal-item');
const idxString = parent.dataset.index;
const index = Number(idxString);
const item = cartItems[index];
if(item.type === "extra"){
  const extraContainer = document.querySelector('.cart__modal-extras');
  const extras = extraContainer.querySelectorAll('.cart__modal-extra');
     extras.forEach(ex => {
        if(ex.dataset.extraId === item.extraId){
      ex.classList.remove('hidden');
        }
    });

  cartItems.splice(index,1);
}else{
cartItems.splice(index,1);
}
renderCart();
total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
cartTotal.textContent = total;
}
else if(event.target.classList.contains('cart__modal-left')){
const parent = event.target.closest('.cart__modal-item')
const idxString = parent.dataset.index;
const index = Number(idxString);
const item = cartItems[index];
if (item.type === "extra") {
    if (item.quantity > 1) {
        item.quantity = item.quantity - 1;
        item.price = item.basePrice * item.quantity;
        renderCart();
        return;
    }
    const extraContainer = document.querySelector('.cart__modal-extras');
    const extras = extraContainer.querySelectorAll('.cart__modal-extra');
    extras.forEach(ex => {
        if (ex.dataset.extraId === item.extraId) {
            ex.classList.remove('hidden');
        }
    });
    cartItems.splice(index, 1);
    renderCart();
    return;
}
if (item.quantity > 1) {
    item.quantity -= 1;
    item.price = calculatePrice(item);
    renderCart();
} else {
    cartItems.splice(index, 1);
    renderCart();
}
}

});
const createItemExtra = (extraEl)=>{
  const itemExtra = {
      type:"extra",
  img:"",
  alt:"",
  title:"",
  quantity:1,
  price:0,
  extraId:"",
  basePrice:0
  }
itemExtra.price = parseFloat(extraEl.querySelector('.cart__modal-extraprice').textContent);
const imgEl = extraEl.querySelector('img');
itemExtra.img = imgEl.src;
itemExtra.alt = imgEl.alt;
itemExtra.title = extraEl.querySelector('.cart__modal-text').textContent;
itemExtra.extraId = extraEl.dataset.extraId;
itemExtra.basePrice = parseFloat(extraEl.querySelector('.cart__modal-extraprice').textContent)
itemExtra.price = itemExtra.basePrice;
return itemExtra;
}
const extrasContainer = document.querySelector('.cart__modal-extras');
extrasContainer.addEventListener('click',(event)=>{
const extra = event.target.closest('.cart__modal-extra');
if(!extra)  return;
extra.classList.add('hidden'); 
const itemExtra = createItemExtra(extra);
addToCart(itemExtra);
extra.classList.add('hidden');
});