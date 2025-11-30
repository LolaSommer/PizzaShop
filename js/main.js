import { initNavigation } from "./modules/navigation.js";
import { initHero } from "./modules/hero.js";
import { initEffects } from "./modules/effects.js";
import { initFilter } from "./modules/filter.js";
import { initMenu } from "./modules/menu.js";
import { initPizzaModal } from "./modules/pizzaModal.js";
import { initCart } from "./modules/cart.js";
import { initAuth } from "./modules/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initHero();
    initEffects();
    initFilter();
    initMenu();
    initPizzaModal();
    initCart();
    initAuth();
});


