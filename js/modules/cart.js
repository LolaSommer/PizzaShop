import { calculatePrice, sizeMap } from "./state.js";
import { toggleBodyLock } from "./modal-lock.js";
import { openUniversal } from "./auth.js";
import { startEditMode } from "./pizzaModal.js";
let cartItems = [];
function saveCartToLocal() {
  const cartItemsString = JSON.stringify(cartItems);
  localStorage.setItem('cart',cartItemsString);
}
function loadCartFromLocal() {
const storedCart = localStorage.getItem('cart');
if(storedCart === null){
  return;
}else{
  const data = JSON.parse(storedCart);
  cartItems = data;
  renderCart();
}
}
const cartTotal = document.querySelector('.cart__total');
const cart = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart__modal');
const cartModalOverlay = document.querySelector('.cart__modal-overlay');
const cartClose = document.querySelector('.cart__modal-close');
const checkTotal = document.querySelector('.cart__modal-checkout');
const thanks = document.querySelector('.thankyou__modal');
const accBtn = document.querySelector('.account-btn');
const thanksClose = document.querySelector('.thankyou__close');
const thanksOver = document.querySelector('.thankyou__overlay');
export function getCartTotal(){
const total = cartItems.reduce((acc, item) => acc + item.price, 0);
return total;
}
export function clearCart() {
cartItems = [];
renderCart();
localStorage.removeItem("cart");  
  const extras = document.querySelectorAll('.cart__modal-extra')
    extras.forEach(ex => {
        ex.classList.remove('hidden');
    });
}
export function getRawTotal() {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
};
function thanksCloseAll() {
thanks.classList.add('hidden');
thanks.setAttribute('aria-hidden', 'true');
};
thanksClose.addEventListener('click',()=>{
thanksCloseAll();
toggleBodyLock();
});
thanksOver.addEventListener('click', ()=>{
thanksCloseAll();
toggleBodyLock();
});
const thanksBtn = document.querySelector('.thankyou__btn');
thanksBtn.addEventListener('click', ()=>{
  thanksCloseAll();
  toggleBodyLock();
})
function cartModalOpen() { 
  cartModal.classList.remove('hidden'); 
  cartModal.setAttribute('aria-hidden', 'false'); 
  cartModalOverlay.classList.remove('hidden'); 
} 
function cartModalClose() {
   cartModal.classList.add('hidden');
    cartModal.setAttribute('aria-hidden','true'); 
  cartModalOverlay.classList.add('hidden'); 
}

function isSamePizza(item1, item2) {
    if (
        item1.title !== item2.title ||
        item1.size !== item2.size ||
        item1.crust !== item2.crust ||
        item1.ingredients.length !== item2.ingredients.length
    ) {
        return false;
    }

    const sortedIngr1 = [...item1.ingredients].sort();
    const sortedIngr2 = [...item2.ingredients].sort();

    for (let i = 0; i < sortedIngr1.length; i++) {
        if (sortedIngr1[i] !== sortedIngr2[i]) return false;
    }
    return true;
}
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

const renderCart = () =>{

const container = document.querySelector('.cart__modal-items');
container.innerHTML = '';
const totalHTML = cartItems.reduce((acc, item, index) => {
    return acc + generateCartItem(item,index);
}, '');
 const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total;
container.innerHTML = totalHTML;
const checkoutBtn = document.querySelector('.cart__modal-checkout');

const cartTotalPrice = document.querySelector('.cart__modal-total');
let totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
const numberElement = document.querySelector('.cart__modal-number');
const word = total === 1?'item':'items';
numberElement.textContent = `${total} ${word}`;


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
const extraCards = document.querySelectorAll('.cart__modal-extra');
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
}
//добавление товара экстра в корзину
export function addToCart (item) {
  const existingItem = cartItems.find(cartItem => 
    isSamePizza(item, cartItem)
  );
  if (existingItem) {
    existingItem.quantity += item.quantity;
    existingItem.price = calculatePrice(existingItem);
    renderCart();
    saveCartToLocal();
    return;
  }
  cartItems.push(item);
  renderCart();
  saveCartToLocal();
};
export function updateCartItem(index, newItem) {
    cartItems[index] = newItem;
    renderCart();
    saveCartToLocal();
}

export function initCart() {
  loadCartFromLocal();
      let total = 0;
cartModal.addEventListener("click", (event) => {
    const btn = event.target.closest(".cart__modal-checkout");
    if (!btn) return;

    
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    if (accBtn.classList.contains('hidden')) {
        window._fromCheckout = true;
        window._checkoutTotal = total;  
        cartModalClose();
        openUniversal();
        toggleBodyLock();
    } else {
        cartModalClose();
        thanks.classList.remove('hidden');
        thanks.setAttribute('aria-hidden', 'false');

        const priceEl = document.querySelector('.thankyou__price');
        priceEl.textContent = `$${total.toFixed(2)}`;

        toggleBodyLock();
        clearCart();
    }
});
document.addEventListener("click", (event) => {
    const btn = event.target.closest(".modal__order-btn");
    if (!btn) return;

    if (!window._createdItemForCart) return;

    addToCart(window._createdItemForCart);
    window._createdItemForCart = null;
});

//корзина открывается , открывается оверлей на всем свободном пространстве 
cart.addEventListener('click',()=>{
  cartModalOpen();
   renderCart();
   toggleBodyLock();
});

//корзина закрывается по клику на крестик 
cartClose.addEventListener('click',()=>{
cartModalClose();
 toggleBodyLock();
});
//корзина закрывается по клику на свобобдное пространство 
cartModalOverlay.addEventListener('click',()=>{
  cartModalClose();
  toggleBodyLock();
});


//подтягивание контента из карточки в корзину

const container = document.querySelector('.cart__modal-items');
container.addEventListener('click',(event)=>{
 const removeBtn = event.target.closest('.cart__modal-remove');
if(event.target.classList.contains('cart__modal-right')){
const parent = event.target.closest('.cart__modal-item')
        if (!parent) return;   
const idxString = parent.dataset.index;
const index = Number(idxString);
const item = cartItems[index];
if(item.type === "extra"){
  item.quantity=item.quantity+1;
  item.price = item.basePrice * item.quantity;
  renderCart();
  saveCartToLocal();
} else{
item.quantity=item.quantity+1;
item.price = calculatePrice(item);
renderCart();
}
}

else if (removeBtn){
const parent = event.target.closest('.cart__modal-item');
        if (!parent) return;   
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
saveCartToLocal();
}
else if(event.target.classList.contains('cart__modal-left')){
const parent = event.target.closest('.cart__modal-item');
        if (!parent) return;   
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
    saveCartToLocal();
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
});
container.addEventListener('click', (event) => {
    const change = event.target.closest('.cart__modal-change');
    if (change) {
        const parent = event.target.closest('.cart__modal-item');
                if (!parent) return;   
        const index = Number(parent.dataset.index);
        const item = cartItems[index];
        startEditMode(item, index);
    }
});
};

