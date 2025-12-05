import { toggleBodyLock } from "./modal-lock.js";
export function initFooter() {
    const titles = {
        twitter: "X",
        instagram: "Instagram",
        facebook: "Facebook"
    };
    const urls = {
    twitter:"https://instagram.com/pizzashop-demo",
    instagram:"https://twitter.com/pizzashop-demo",
    facebook:"https://facebook.com/pizzashop-demo"
    }
    const netGroup = document.querySelector('.footer__social');
    const netModal = document.querySelector('.net__modal');
    const netSpan = netModal.querySelector('.net__span');
    const netCopied = netModal.querySelector('.net__copied');
    function showOnlyNet(type) {
   const netItems = netModal.querySelectorAll('.net__item');
   netItems.forEach(item => item.classList.add('hidden'));
   const btn = netModal.querySelector(`[data-type="${type}"]`);
   netSpan.textContent = titles[type];
   btn.classList.remove('hidden');
}
    function netModalOpen (){
    netModal.classList.remove('hidden');
    netModal.setAttribute('aria-hidden', 'false');
    }
    function netModalClose (){
    netModal.classList.add('hidden');
    netModal.setAttribute('aria-hidden', 'true');
    }
    const modalIcons = netModal.querySelector('.net__group');

modalIcons.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-type]');
    if (!btn) return;

    const type = btn.dataset.type;

    navigator.clipboard.writeText(urls[type]).then(() => {
        netCopied.classList.remove('hidden');
        netCopied.classList.add('show');

        setTimeout(() => {
            netCopied.classList.add('hidden');
            netCopied.classList.remove('show');
            netModalClose();
            toggleBodyLock();
        }, 1500);
    });
});
    netGroup.addEventListener('click',(event)=>{
        const btn = event.target.closest('[data-type]');
        if(!btn) return;
        const type = btn.dataset.type;
         netModalOpen();
         showOnlyNet(type);
         toggleBodyLock();
    })
    const netClose = document.querySelector('.net__close');
    const netOver = document.querySelector('.net__overlay');
    netClose.addEventListener('click',()=>{
   netModalClose ();
   toggleBodyLock();
    });
    netOver.addEventListener('click',()=>{
    netModalClose();
    toggleBodyLock();
    });
    //footer links
const menuSection = document.querySelector('#menu');
const eventsSection = document.querySelector('#events');
const aboutSection = document.querySelector('#about');
const heroSection = document.querySelector('#hero');
const footer = document.querySelector('footer');
const filterButtons = document.querySelectorAll('.menu__item');
const vegButton = document.querySelector('.menu__item[data-filter="veggie"]');
const meatButton = document.querySelector('.menu__item[data-filter="meat"]');
const allButton = document.querySelector('.menu__item[data-filter="all"]');
footer.addEventListener('click', (event) => {
   const link = event.target.closest('[data-scroll]');
   if (!link) return;
   const type = link.dataset.scroll;
    switch(type) {
      case 'veg':
          vegButton.click();
          menuSection.scrollIntoView({behavior: 'smooth'});
          break;

      case 'meat':
          meatButton.click();
         menuSection.scrollIntoView({behavior: 'smooth'});
          break;

      case 'menu':
        allButton.click();
          menuSection.scrollIntoView({behavior: 'smooth'});
          break;

      case 'events':
        eventsSection.scrollIntoView({behavior: 'smooth'});
          break;

        case 'about':
        aboutSection.scrollIntoView({behavior: 'smooth'});
        break;

        case 'hero':
        heroSection.scrollIntoView({behavior: 'smooth'});
        break;
        }
    
});

}