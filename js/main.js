const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section');
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
  const activeLink = document.querySelector(`.nav__link[href="#${activeSection.id}"]`);
  navLinks.forEach(l=>l.classList.remove('active'));
  if(activeLink){
     activeLink.classList.add('active');

  }
}
window.addEventListener('scroll', updateOnScroll);

const cards = document.querySelectorAll('.menu__card'); 
let cartItems = [];
const cartTotal = document.querySelector('.cart__total');
cards.forEach((card)=>{
  const pizzaState = { size:null, ingredients:[], quantity:0 }
  const minus = card.querySelector('.card__minus');
  const count = card.querySelector('.card__count');
  card.addEventListener('click',(event)=>{
    event.preventDefault();
    let value = +count.textContent;
    if(event.target.classList.contains('card__plus')){
      value=value+1;
       count.textContent=value;
     pizzaState.quantity = value;

    }
    else if(event.target.classList.contains('card__minus') && value>0){
      value=value-1;
      count.textContent=value;
      pizzaState.quantity = value;
    }
    if(value ===0){
      minus.disabled = true;
    }else{
      minus.disabled = false;
    }
    if (pizzaState.size && pizzaState.quantity > 0) {
  order.disabled = false;
} else {
  order.disabled = true;
}

   
  });
const sizeButtons = card.querySelectorAll('.card__btn button');
sizeButtons.forEach((btn)=>{
btn.addEventListener('click',(event)=>{
  sizeButtons.forEach(b=>b.classList.remove('active-btn'));
  event.currentTarget.classList.add('active-btn');
  pizzaState.size = event.currentTarget.dataset.size;
});
if (pizzaState.size && pizzaState.quantity > 0) {
  order.disabled = false;
}
})



const order = card.querySelector('.card__order');
 order.addEventListener('click',()=>{ 
  const item ={...pizzaState}; 
  if(item.size && item.quantity >0){
     cartItems.push(item); 
    } 
    pizzaState.quantity = 0;
    count.textContent = 0;
    minus.disabled = true;
    order.disabled = true;
    sizeButtons.forEach(b => b.classList.remove('active-btn'));

    const total = cartItems.reduce((sum,item)=>sum+item.quantity,0); 
     cartTotal.textContent = total; });
});

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const ingredientCards = document.querySelectorAll('.modal__card');
const modalOrderBtn = document.querySelector('.modal .card__order');
const btnIngredients = document.querySelectorAll('.card__ingredients');
const modalOverlay = document.querySelector('.modal__overlay');

let modalState = {
  size:null,
  crust:null,
  ingredients:[],
  basePrice:9.99,
  extraPrice:0
};
btnIngredients.forEach((button)=>{
  button.addEventListener('click', (event)=>{
         let currentCard = null;
currentCard = button.closest('.menu__card');
      const cardTitle = currentCard.querySelector('.card__header');
const modalTitle = modal.querySelector('.ingredients__title');
modalTitle.textContent = cardTitle.textContent;

const cardText = currentCard.querySelector('.card__text');
const modalText = modal.querySelector('.modal__ingredients-text');
modalText.textContent = cardText.textContent;

 const cardSource = currentCard.querySelector('source');
const modalSource = modal.querySelector('.modal__img').previousElementSibling; // <source>
modalSource.srcset = cardSource.srcset;

   


   const activeBtn = currentCard.querySelector('.active-btn');
 const modalSizeButtons = modal.querySelectorAll('.modal__radio button')
   modalSizeButtons.forEach(btn => btn.classList.remove('active-btn'));
   if(activeBtn){
 modalSizeButtons.forEach((modalBtn)=>{ 
  if(modalBtn.dataset.size === activeBtn.dataset.size){
    modalBtn.classList.add('active-btn');
  }
})
   }
    const closestCont = button.closest('.menu__card');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
  });
 
});


modalClose.addEventListener('click',(event)=>{
  modal.classList.add('hidden');
   modal.setAttribute('aria-hidden','true');

});

modalOverlay.addEventListener('click',()=>{
modal.classList.add('hidden');
});


const modalSizeButtons = modal.querySelectorAll('.modal__radio button');
modalSizeButtons.forEach((modalSizeButton)=>{
  modalSizeButton.addEventListener('click',(event)=>{
    modalSizeButtons.forEach(btn => btn.classList.remove('active-btn'));
     modalSizeButton.classList.add('active-btn');
  modalState.size = event.currentTarget.dataset.size
  })
})

const crustBtns = modal.querySelectorAll('.modal__btn button');
crustBtns.forEach((crustBtn)=>{
  crustBtn.addEventListener('click',(event)=>{
crustBtns.forEach(b=>b.classList.remove('btn-active'));
event.currentTarget.classList.add('btn-active');
modalState.crust = event.currentTarget.dataset.crust;
  });

});
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

});
});

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

const resetModal = ()=>{
ingredientCards.forEach(card => card.classList.remove('modal__card-value'));
crustBtns.forEach(btns =>btns.classList.remove('btn-active'));
modalSizeButtons.forEach(buttons =>buttons.classList.remove('active-btn'));

  modalState.size = null;
  modalState.crust = null;
  modalState.ingredients = [];
  modalState.extraPrice =0;
}
modalClose.addEventListener('click',()=>{
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden','true');
  resetModal();
});
modalOverlay.addEventListener('click',()=>{
   modal.classList.add('hidden');
   modal.setAttribute('aria-hidden','true');
  resetModal();
})