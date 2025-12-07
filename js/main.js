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
import "./modules/modal-lock.js";
document.addEventListener("DOMContentLoaded", () => {
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
    initCart();
    initAuth();
    initFooter();
});


