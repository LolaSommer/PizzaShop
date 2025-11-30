//базовые цены на пиццу по размеру 
  export const basePrices = {
  10: 9.99,
  12: 12.99,
  14: 15.99,
};
//базовые размеры пиццы
export const sizeMap = {
  10: { inches: '10″', label: 'Small' },
  12: { inches: '12″', label: 'Medium' },
  14: { inches: '14″', label: 'Large' }
};
//ингредиенты и цены в модалке
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

//функция изменения цены 
export const calculatePrice=(cardState)=>{
const base = basePrices[cardState.size] || 0;
const extra = cardState.ingredients.reduce((sum,name) => { 
  return sum + ingredientsPrices[name]; 
}, 0);
return (base + extra) * cardState.quantity;
}

