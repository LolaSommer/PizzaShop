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

//карточка товара
const cards = document.querySelectorAll('.menu__card'); 
let cartItems = [];
const cartTotal = document.querySelector('.cart__total');
cards.forEach((card)=>{
//базовые цены на пиццу по размеру 
  const basePrices = {
  22: 9.99,
  28: 12.99,
  33: 15.99,
};
//кнопка оформления заказа
 const pizzaState = { size:22, ingredients:[], quantity:1 }
const order = card.querySelector('.card__order');
 //обновление цены,кол-ва, размера при нажатии на кнопку 
    const resetCardState = ()=>{
    pizzaState.quantity = 1;
    pizzaState.size = 22;
count.textContent = 1;
sizeButtons.forEach(b => b.classList.remove('active-btn'));
const defaultBtn = card.querySelector('[data-size="22"]');
defaultBtn.classList.add('active-btn');
updatePrice();   
    }
 order.addEventListener('click',()=>{ 
  const item ={...pizzaState}; 
  if(item.size && item.quantity >0){
     cartItems.push(item); 
    } 
   resetCardState();
    const total = cartItems.reduce((sum,item)=>sum+item.quantity,0); 
     cartTotal.textContent = total; });
const priceElement = card.querySelector('.price__value');
//функция обновления цены
const updatePrice=()=>{
const base = basePrices[pizzaState.size] || 0;
const total = (base * pizzaState.quantity).toFixed(2);
priceElement.textContent = `${total}$`;
}
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
     updatePrice();
    }
    else if(event.target.classList.contains('card__minus') && value>0){
      value=value-1;
      count.textContent=value;
      pizzaState.quantity = value;
      updatePrice();
    }
   

   
  });
  //кнопки выбора размера пиццы
const sizeButtons = card.querySelectorAll('.card__btn button');
sizeButtons.forEach((btn)=>{
btn.addEventListener('click',(event)=>{
  sizeButtons.forEach(b=>b.classList.remove('active-btn'));
  event.currentTarget.classList.add('active-btn');
  pizzaState.size = event.currentTarget.dataset.size;
  updatePrice();
});
if (pizzaState.size && pizzaState.quantity > 0) {
  order.disabled = false;
}
})

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
  basePrice:9.99,
  extraPrice:0,
  quantity:1
};
//обновление цены 
const updateModalPrice = () => {
  const total = (modalState.basePrice + modalState.extraPrice).toFixed(2);
  modalOrderBtn.textContent = `Grab Your Slice ${total}$`;
};

//кнопка ингредиенты 

btnIngredients.forEach((button) => {
  button.addEventListener('click', (event) => {
    const currentCard = button.closest('.menu__card');

    // Получаем цену пиццы из карточки
    const cardPrice = parseFloat(currentCard.querySelector('.price__value').textContent);
    modalState.basePrice = cardPrice;

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

    // Показываем модалку
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal__body-active');

    updateModalPrice();
  });
});

//крестик закрытия
modalClose.addEventListener('click',(event)=>{
  modal.classList.add('hidden');
   modal.setAttribute('aria-hidden','true');
   document.body.classList.remove('modal__body-active');

});
//свободное пространство 
modalOverlay.addEventListener('click',()=>{
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
  })
})
//выбор корочки ,теста 
const crustBtns = modal.querySelectorAll('.modal__btn button');
crustBtns.forEach((crustBtn)=>{
  crustBtn.addEventListener('click',(event)=>{
crustBtns.forEach(b=>b.classList.remove('btn-active'));
event.currentTarget.classList.add('btn-active');
modalState.crust = event.currentTarget.dataset.crust;
  });

});
//кнопки ингредиентов 
ingredientCards.forEach((ingredientCard)=>{ 
  ingredientCard.addEventListener('click',(event)=>{
    const card = event.currentTarget;
   const price = parseFloat(card.querySelector('.picture__price').textContent);
   const name = card.querySelector('.picture__text').textContent.trim();
     if(ingredientCard.classList.contains('modal__card-value')){
       event.currentTarget.classList.remove('modal__card-value'); 
      modalState.ingredients = modalState.ingredients.filter(item => item !==name);
      modalState.extraPrice -= price; 
      }
       else{ 
        event.currentTarget.classList.add('modal__card-value'); 
        modalState.ingredients.push(name);
       modalState.extraPrice +=price;
       }
       const totalPrice = (modalState.basePrice + modalState.extraPrice).toFixed(2);
       modalOrderBtn.textContent = `Grab Your Slice ${totalPrice}$`;

});
});

//при нажатии на кнопку заказа в модалке добавить в корзину 
  const resetModalState = ()=>{
    modalState.quantity = 1;
    modalState.size = 22;
     modalState.extraPrice = 0;
     modalState.ingredients=[];
modalSizeButtons.forEach(b => b.classList.remove('active-btn'));
const modalDefBtn = modal.querySelector('[data-size="22"]');
modalDefBtn.classList.add('active-btn');
ingredientCards.forEach(card => card.classList.remove('modal__card-value'));
crustBtns.forEach(crustBtn => crustBtn.classList.remove('btn-active'));

  updateModalPrice();
    }
modalOrderBtn.addEventListener('click',()=>{
  function addToCart(item) {
  cartItems.push(item);
  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = total;
}
addToCart({...modalState,quantity: 1});
  modal.classList.add('hidden');
modal.setAttribute('aria-hidden', 'true');
document.body.classList.remove('modal__body-active');
resetModalState();
});
  

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



