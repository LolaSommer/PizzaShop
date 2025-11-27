//переменные секции и ссылки меню
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section');
//обработчик на ссылки меню по клику 
navLinks.forEach(link=>{
    link.addEventListener('click', (event) => {
  event.preventDefault(); 
  navLinks.forEach(l => l.classList.remove('active'));
  link.classList.add('active');

  const hrefValue = link.getAttribute('href');
  const targetId = hrefValue.substring(1);
  document.getElementById(targetId)
          .scrollIntoView({ behavior: 'smooth' });
});
});
//функция рассчета текущей секции
function updateOnScroll() {
  const scrollY = window.scrollY + window.innerHeight / 2; 
  let activeSection = null;


  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      activeSection = section;
    }
  });
  //добавление активной ссылки на пункты меню
  if(!activeSection) return;
  const activeLink = document.querySelector(`.nav__link[href="#${activeSection.id}"]`);
  navLinks.forEach(l=>l.classList.remove('active'));
  if(activeLink){
     activeLink.classList.add('active');

  }
}

window.addEventListener('scroll', updateOnScroll);
//начало проигрывания видео при  нажатии на плей или пауза
const video = document.querySelector('video');
const videoBtn = document.querySelector('.video__btn');
videoBtn.addEventListener('click',()=>{
  video.play();
  videoBtn.style.display = 'none';
});
video.addEventListener('click',()=>{
 video.pause();
videoBtn.style.display = 'block';
});

//эффект волны на кнопке 
function addRippleEffect(button) {
  button.classList.add('ripple');
  
  button.addEventListener('click', function (event) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}
const orderButtons = document.querySelectorAll('.card__order');
orderButtons.forEach(btn => addRippleEffect(btn));
const checkout = document.querySelectorAll('.cart__modal-checkout');
checkout.forEach(btn => addRippleEffect(btn));
//базовые цены на пиццу по размеру 
  const basePrices = {
  10: 9.99,
  12: 12.99,
  14: 15.99,
};
//базовые размеры пиццы
const sizeMap = {
  10: { inches: '10″', label: 'Small' },
  12: { inches: '12″', label: 'Medium' },
  14: { inches: '14″', label: 'Large' }
};
//ингредиенты и цены в модалке
const ingredientsPrices = {
  "cheeses": 1.75,
  "mozzarella": 1.75,
  "chicken pieces": 2,
  "bacon": 1.8,
  "jalapeño": 1.5,
  "champignons": 1.5,
  "cucumber slices": 1.6,
  "salami": 2,
  "ananas pieces": 1.75
};


//функция изменения цены 
const calculatePrice=(cardState)=>{
const base = basePrices[cardState.size] || 0;
const extra = cardState.ingredients.reduce((sum,name) => { 
  return sum + ingredientsPrices[name]; 
}, 0);
return (base + extra) * cardState.quantity;
}
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
modalState.ingredients = []
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
const oldItem = cartItems[editingIndex];
    const newItem = {
      ...oldItem,                        
      size: modalState.size,
      quantity: modalState.quantity,
      crust: modalState.crust,
      ingredients: [...modalState.ingredients],
      price: calculatePrice(modalState),
    };
   cartItems = [
      ...cartItems.slice(0, editingIndex),
      newItem,
      ...cartItems.slice(editingIndex + 1),
    ];
renderCart();
editingIndex = null;
  }else{
 const item = createItemFromCard(activeCard, modalState);
 addToCart(item);
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
});
//корзина закрывается по клику на свобобдное пространство 
cartModalOverlay.addEventListener('click',()=>{
  cartModal.classList.add('hidden');
  cartModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal__body-active');
  cartModalOverlay.classList.add('hidden');
});

//добавление карточки товара пиццы в корзину
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
      <button class="cart__modal-change"></button>
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
  //добавление карточки товара экстра в корзину
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


 //двойная кнопнка на герое 
const btnRight = document.querySelector('.hero__btn-right');
const menuSection = document.querySelector('.menu');
const btnLeft = document.querySelector('.hero__btn-left');
//скролл до меню
btnRight.addEventListener('click',()=>{
  btnRight.classList.add('btn-active');
  btnLeft.classList.remove('btn-active');
  menuSection.scrollIntoView({behavior: 'smooth'});
});
//открытие модального окна 
btnLeft.addEventListener('click',()=>{
btnLeft.classList.add('btn-active');
btnRight.classList.remove('btn-active');
const firstIngredientsButton = document.querySelector('.card__ingredients');
firstIngredientsButton.click();
});
//кнопка логин 
const logIn = document.querySelector('.header__order');
const accLog = document.querySelector('.acc__modal-log');
const accOver = document.querySelector('.acc__modal-overlay');
//открытие кнопки логин
logIn.addEventListener('click',()=>{
accLog.classList.remove('hidden');
});
//кнопка изменить в модалке 
container.addEventListener('click', (event) => {
    const change = event.target.closest('.cart__modal-change');
    if (!change) return;

    activeCard = null;

    const parent = event.target.closest('.cart__modal-item');
    const idxString = parent.dataset.index;
    const index = Number(idxString);
    const item = cartItems[index];

    editingIndex = index;

    // Открываем модалку
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal__body-active');

    // Полный сброс состояния модалки
    modalState.size = item.size;
    modalState.quantity = item.quantity;
    modalState.crust = item.crust;
    modalState.ingredients = [...item.ingredients];

    // SIZE кнопки
    const sizeButtons = modal.querySelectorAll('.modal__radio button');
    sizeButtons.forEach(btn => btn.classList.remove('active-btn'));
    const activeBtn = modal.querySelector(`.modal__radio button[data-size="${modalState.size}"]`);
    if (activeBtn) activeBtn.classList.add('active-btn');

    // CRUST кнопки
    const crustBtns = modal.querySelectorAll('.modal__btn button');
    crustBtns.forEach(btn => btn.classList.remove('btn-active'));
    const activeCrustBtn = modal.querySelector(`.modal__btn button[data-crust="${modalState.crust}"]`);
    if (activeCrustBtn) activeCrustBtn.classList.add('btn-active');

    // INGREDIENTS
    const ingCards = modal.querySelectorAll('.modal__card');
    ingCards.forEach(card => {
        const ing = card.dataset.ing;
        if (modalState.ingredients.includes(ing)) {
            card.classList.add('modal__card-value');
        } else {
            card.classList.remove('modal__card-value');
        }
    });
// 🔥 ПЕРЕДАЁМ В МОДАЛКУ НАЗВАНИЕ + КАРТИНКУ
const modalTitle = modal.querySelector('.ingredients__title');
modalTitle.textContent = item.title;

const modalText = modal.querySelector('.modal__ingredients-text');
modalText.textContent = ""; // временно

const modalImg = modal.querySelector('.modal__img');
modalImg.src = item.img;
modalImg.alt = item.alt;

const modalSource = modal.querySelector('.modal__img').previousElementSibling;
modalSource.srcset = item.img;

    // PRICE
    const price = calculatePrice(modalState);
    updateModalButtonText();
});

const updateModalButtonText = () =>{
 
  if(editingIndex !== null){
 modalOrderBtn.textContent = `Save Changes ${calculatePrice(modalState).toFixed(2)}$`;
  }else{
     modalOrderBtn.textContent = `Grab Your Slice ${calculatePrice(modalState).toFixed(2)}$`;
  }
}
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