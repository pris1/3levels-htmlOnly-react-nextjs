//bringing these dom elements into js so that we can manipulate them programmatically
const input = document.querySelector('input');
const button = document.querySelector('button');
const p = document.querySelector('p');

//when the button is clicked all this is going to happen get the input value, create urlencoded body and send these http parts including body to the browser so that the browser can use them to create a post http req
//step1 register the button event so that the browser can prepare to watch for events
button.addEventListener('click', () => {
  //step2 get the input value from the input ui
  const inputValue = input.value;
  console.log(inputValue);
  //step3 use this input value to create a body or format urlencoded by using urlsearchparams
  //Step 2 — Create an empty URLSearchParams object
  const paramsObject = new URLSearchParams(); //empty object
  //step3 wat to put inside this empty object?what key to put herein? what does the backend expect

  paramsObject.set('name', inputValue);

  //step 4 check what i have created
  console.log(paramsObject); //URLSearchParams {size: 1}

  //to convert urlsearchparams into its URL-encoded representation
  const paramsString = paramsObject.toString();

  console.log(paramsObject.toString());

  fetch('http://localhost:3000/recipes', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: paramsString,
  })
    .then((resObj) => {
      //parsing the resobject into js objec
      return resObj.json();
    })
    //one recipe in this format:javascriptObj
    .then((recipe) => {
      p.innerText = recipe.name;
    });
});
