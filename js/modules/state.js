// === БАЗОВЫЕ ДАННЫЕ ПИЦЦ ===

// базовые цены на размеры
export const basePrices = {
  10: 9.99,
  12: 12.99,
  14: 15.99,
};

// размеры и метки
export const sizeMap = {
  10: { inches: '10″', label: 'Small' },
  12: { inches: '12″', label: 'Medium' },
  14: { inches: '14″', label: 'Large' }
};

// цены ингредиентов
export const ingredientsPrices = {
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


// === СОСТОЯНИЕ МОДАЛКИ ПИЦЦЫ ===
export const modalState = {
  size: 10,
  crust: "traditional",
  ingredients: [],
  quantity: 1,
};


// === СОСТОЯНИЕ КОРЗИНЫ ===
export let cartItems = [];        
export let editingIndex = null;   
export let activeCard = null;    


// === СЕТТЕРЫ ДЛЯ ИЗМЕНЯЕМЫХ ПЕРЕМЕННЫХ ===
export function setCartItems(newValue) {
  cartItems = newValue;
}

export function setEditingIndex(val) {
  editingIndex = val;
}

export function setActiveCard(val) {
  activeCard = val;
}


