import { initNavigation } from "./modules/navigation.js";
import { initHero } from "./modules/hero.js";
import { initEffects } from "./modules/effects.js";
import { initFilter } from "./modules/filter.js";
import { initMenu } from "./modules/menu.js";
import { initPizzaModal } from "./modules/pizzaModal.js";
import { initCart } from "./modules/cart.js";
import { initAuth } from "./modules/auth.js";
import {initFooter} from  "./modules/footer.js";
import { showSkeleton, hideSkeleton } from "./modules/skeleton.js";
import { initBlog } from "./modules/blog.js";
import "./modules/modal-lock.js";
const pageType = document.body.dataset.page;
document.addEventListener("DOMContentLoaded", () => {
  if (pageType === "blog") {
    initBlog();
    initFooter();
    return;
  }
  initNavigation();
  initHero();
  initEffects();
  initFilter();
  showSkeleton();
  setTimeout(() => {
    initMenu();
    hideSkeleton();
  }, 600);
  initPizzaModal();
  if (window.location.hash === "#pizza") {
  const firstBtn = document.querySelector('.card__ingredients');
  if (firstBtn) firstBtn.click();
};
  initCart();
  initAuth();
  initFooter();
});


