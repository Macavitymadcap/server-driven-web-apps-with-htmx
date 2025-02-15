const updateStyles = data => {
  const { bgColour, fgColour } = data;
  const blockquotes = htmx.findAll('blockquote');
  for (const blockquote of blockquotes) {
    blockquote.style.backgroundColor = bgColour;
    blockquote.style.color = fgColour;
  }
};

const debugForm = () => {
  const form = htmx.find('#register-form');
  console.log(form);
  const values = htmx.values(form);
  console.log('Form values: ', values);
  console.log('Form values (stringified): ', JSON.stringify(values, null, 2));
};

const ingredients = [
  'Anchovies',
  'Bacon',
  'Black Olives',
  'Green Pepper',
  'Mushroom',
  'Pepperoni',
  'Pineapple',
  'Sausage',
  'Spinach',
];

const orderPizza = () => {
  const selectedInGredients = htmx.findAll('.ingredient.selected');
  const names = Array.from(selectedInGredients).map(
    ingredient => ingredient.textContent,
  );
  const list = names.length ? names.join(', ') : 'no toppings';
  alert(`You ordered a pizza with ${list}`);
};

const selectTopping = event => {
  const ingredient = event.target;
  htmx.toggleClass(ingredient, 'selected');
};

const updateStats = () => {
  htmx.ajax('GET', '/chapter-6/heap-size', '#heap-size');
};

const getQuote = () => {
  htmx.ajax('GET', '/chapter-6/quote', { target: '#quote', swap: 'innerHTML' });
};

window.onload = () => {
  updateStats();
  setInterval(updateStats, 5000);
  getQuote();
  setInterval(getQuote, 10_000);
};
