const inputRecipe = document.querySelector('#recipe');
const inputFileUpload = document.querySelector('#fileUpload');
const button = document.querySelector('button');
const result = document.querySelector('#result');

button.addEventListener('click', () => {
  //step1 extract the text input value
  const inputValue = inputRecipe.value;
  //step2 extract the selected file object
  const fileValue = inputFileUpload.files[0];

  const formData = new FormData();
  // put data into formdata
  formData.set('name', inputValue);
  formData.set('recipeFile', fileValue);

  //test without backend 
  ('input value:', inputValue)
  console.log('file:', fileValue)
  console.log('file name:', fileValue?.name)
  console.log('file size:', fileValue?.size)
  console.log('formData name:', formData.get('name'))
  console.log('formData file:', formData.get('recipeFile'))

  fetch('http://localhost:3000', {
    method: 'POST',

    body: formData,
  });
});
