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
//двойная кнопнка на герое 
const btnRight = document.querySelector('.hero__btn-right');
const menuSection = document.querySelector('.menu');
const btnLeft = document.querySelector('.hero__btn-left');
btnRight.addEventListener('click',()=>{
  btnRight.classList.add('btn-active');
  btnLeft.classList.remove('btn-active');
  menuSection.scrollIntoView({behavior: 'smooth'});
});
btnLeft.addEventListener('click',()=>{
btnLeft.classList.add('btn-active');
btnRight.classList.remove('btn-active');
modal.classList.remove('hidden');
});
//базовые цены на пиццу по размеру 
  const basePrices = {
  22: 9.99,
  28: 12.99,
  33: 15.99,
};
 const pizzaState = { size:22, ingredients:[], quantity:1 }
const ingredientsPrices = {
"Cheeses": 1.75,
"Mozzarella": 1.75,
"Chicken pieces": 2,
"Bacon": 1.8,
"Jalapeño": 1.5,
"Champignons": 1.5,
"Cucumber slices": 1.6,
"Salami": 2,
"Ananas pieces": 1.75,
}
const calculatePrice=(state)=>{
const base = basePrices[state.size] || 0;
const extra = state.ingredients.reduce((sum,name) => { 
  return sum + ingredientsPrices[name]; 
}, 0);
return (base + extra) * state.quantity;
}
//карточка товара
const cards = document.querySelectorAll('.menu__card'); 
let cartItems = [];
const cartTotal = document.querySelector('.cart__total');
cards.forEach((card)=>{

//кнопка оформления заказа

const order = card.querySelector('.card__order');
 //обновление цены,кол-ва, размера при нажатии на кнопку 
 order.addEventListener('click',()=>{ 
  const item ={...pizzaState}; 
  if(item.size && item.quantity >0){
     cartItems.push(item); 
    } 
   resetUI(card);
    const total = cartItems.reduce((sum,item)=>sum+item.quantity,0); 
     cartTotal.textContent = total; });
const priceElement = card.querySelector('.price__value');
const price = calculatePrice(pizzaState);
priceElement.textContent = `${price.toFixed(2)}$`;

 //переменные счетчик пицц + и -
  const minus = card.querySelector('.card__minus');
  const count = card.querySelector('.card__count');
  pizzaState.quantity = +count.textContent;
  card.addEventListener('click',(event)=>{
    event.preventDefault();
    let value = +count.textContent;
    if(event.target.classList.contains('card__plus')){
      value=value+1;
       count.textContent=value;
     pizzaState.quantity = value;
     const price = calculatePrice(pizzaState);
      priceElement.textContent = `${price.toFixed(2)}$`;
    }
    else if(event.target.classList.contains('card__minus') && value>0){
      value=value-1;
      count.textContent=value;
      pizzaState.quantity = value;
    const price = calculatePrice(pizzaState);
    priceElement.textContent = `${price.toFixed(2)}$`;

    }
   
  });
  //кнопки выбора размера пиццы
const sizeButtons = card.querySelectorAll('.card__btn button');
sizeButtons.forEach((btn)=>{
btn.addEventListener('click',(event)=>{
  sizeButtons.forEach(b=>b.classList.remove('active-btn'));
  event.currentTarget.classList.add('active-btn');
  pizzaState.size = event.currentTarget.dataset.size;
  pizzaState.quantity = 1;
count.textContent = 1;
  const price = calculatePrice(pizzaState);
priceElement.textContent = `${price.toFixed(2)}$`;

});
})
if (pizzaState.size && pizzaState.quantity > 0) {
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
//объект пицца в модальном окне:размер, тесто, ингредиенты, базовая цена и экстрацена
let modalState = {
  size:22,
  crust:null,
  ingredients:[],
  quantity:1
};
const syncModalToCard = ()=>{
  if(activeCard == null) return;
  pizzaState.size = modalState.size;
  pizzaState.ingredients = [...modalState.ingredients];
  const newPrice = calculatePrice(pizzaState);
  const priceElement = activeCard.querySelector('.price__value');
  priceElement.textContent = `${newPrice.toFixed(2)}$`;
  const sizeButtons = activeCard.querySelectorAll('.card__btn button')
  sizeButtons.forEach(btn => btn.classList.remove('active-btn'));
const activeBtn = activeCard.querySelector(`[data-size="${pizzaState.size}"]`);
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
    modalOrderBtn.textContent = `Grab Your Slice ${price.toFixed(2)}$`;
ingredientCards.forEach(card => card.classList.remove('modal__card-value'))

    // Показываем модалку
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal__body-active');
   

  });
});

//крестик закрытия
modalClose.addEventListener('click',(event)=>{
  syncModalToCard();
  modal.classList.add('hidden');
   modal.setAttribute('aria-hidden','true');
   document.body.classList.remove('modal__body-active');
 

});
//свободное пространство 
modalOverlay.addEventListener('click',()=>{
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
modalOrderBtn.textContent = `Grab Your Slice ${price.toFixed(2)}$`;

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
modalOrderBtn.textContent = `Grab Your Slice ${price.toFixed(2)}$`;
  });

});
//кнопки ингредиентов 
ingredientCards.forEach((ingredientCard)=>{ 
  ingredientCard.addEventListener('click',(event)=>{
    const card = event.currentTarget;
   const pricePic = parseFloat(card.querySelector('.picture__price').textContent);
   const name = card.querySelector('.picture__text').textContent.trim();
     if(ingredientCard.classList.contains('modal__card-value')){
       event.currentTarget.classList.remove('modal__card-value'); 
      modalState.ingredients = modalState.ingredients.filter(item => item !==name);
    
      }
       else{ 
        event.currentTarget.classList.add('modal__card-value'); 
        modalState.ingredients.push(name);
      
       }
      const price = calculatePrice(modalState);
modalOrderBtn.textContent = `Grab Your Slice ${price.toFixed(2)}$`;


});
});

//при нажатии на кнопку заказа в модалке добавить в корзину 
modalOrderBtn.addEventListener('click',()=>{
  const price = calculatePrice(modalState);
  function addToCart(item) {
  cartItems.push(item);
  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = total;
}
 addToCart({
        ...modalState,
        price: price,
        quantity: 1
    });
    resetUI(activeCard);
  modal.classList.add('hidden');
modal.setAttribute('aria-hidden', 'true');
document.body.classList.remove('modal__body-active');
});
  

   const resetUI = (activeCard)=>{
    if(activeCard == null) return;
    //сброс карточки
    pizzaState.quantity = 1;
    pizzaState.size = 22;
    pizzaState.ingredients = [];
const count = activeCard.querySelector('.card__count');
const radio = activeCard.querySelectorAll('.card__btn button');
const priceCard = activeCard.querySelector('.price__value');
const size = activeCard.querySelector('[data-size="22"]');
count.textContent = 1;
size.classList.add('active-btn');
radio.forEach(b => b.classList.remove('active-btn'));
size.classList.add('active-btn');
 const price = calculatePrice(pizzaState)
    priceCard.textContent = `${price.toFixed(2)}$`;
   //сброс модалки
  modalState.quantity = 1;
  modalState.size = 22;
  modalState.ingredients=[];
  modalState.crust = null;
const radioModal = modal.querySelectorAll('.modal__radio button');
const cardModal = modal.querySelectorAll('.modal__card');
const btnModal = modal.querySelectorAll('.modal__btn button');
const modalDefBtn = modal.querySelector('[data-size="22"]');
modalDefBtn.classList.add('active-btn');
radioModal.forEach(b => b.classList.remove('active-btn'));
cardModal.forEach(card => card.classList.remove('modal__card-value'));
btnModal.forEach(crustBtn => crustBtn.classList.remove('btn-active'));
modalOrderBtn.textContent = `Grab Your Slice ${calculatePrice(modalState).toFixed(2)}$`;
    }


