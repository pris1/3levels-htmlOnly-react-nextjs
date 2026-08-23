const input = document.querySelector('input');
const button = document.querySelector('button');
const p = document.querySelector('p');

button.addEventListener('click', () => {
  const inputValue = input.value;
  //create a js object with this inputvValue
  const inputObject = {
    name: inputValue,
  };

  fetch('http://localhost:3000/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(inputObject),
  });
});
