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

const cards = document.querySelectorAll('.card__positiv');
 
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
   
  });

const radioButtons = card.querySelectorAll('.card__btn');
radioButtons.forEach((radioButton)=>{
  const button = radioButton.querySelectorAll('button');
  radioButton.addEventListener('click',(event)=>{
  
     button.forEach(l => l.classList.remove('active-btn'));
  
      event.target.classList.add('active-btn');
      pizzaState.size = event.target.dataset.size;
  })
})
});


