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

