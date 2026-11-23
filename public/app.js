const form = document.querySelector('#signup-form');
const confirmation = document.querySelector('#confirmation');
const card = document.querySelector('.card');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  confirmation.textContent = `Cadastro confirmado para ${form.elements.name.value}!`;
  confirmation.hidden = false;
  card.classList.add('is-success');
});
