// step 1 construct the frontend inorder to make it easier to create its backend
// // frontend - fetch one recipe by id
// fetch(`http://localhost:3000/get-recipe/${id}`, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// .then(res => res.json())
// .then(data => console.log(data))

//step 2 construct the backend
// step 3 test without data via thunder
//step 4 use this array to test it
//step 5 when all works then convert to nextjs

// const express = require('express');
// const app = express();

// const recipes = [
//   { id: '1', name: 'Sadza', description: 'Zimbabwe classic' },
//   { id: '2', name: 'Jollof Rice', description: 'West African favourite' },
//   { id: '3', name: 'Pasta', description: 'Italian classic' },
// ];

// app.get('/get-recipe/:id', async (req, res) => {
//   const { id } = req.params;

//   const recipe = recipes.find((r) => r.id === id);  function findRecipe(r) {
  //   return r.id === id  // ← id is accessible here
  // }

  // const recipe = recipes.find(findRecipe)

//   if (!recipe) {
//     return res.status(404).json({ message: 'Recipe not found' });
//   }

//   res.json({ message: 'found', recipe: recipe });
// });

// app.listen(3000, () => {
//   console.log('server is running');
// });


// step 1 construct the frontend inorder to make it easier to create its backend
// // frontend - fetch one recipe by id
// fetch(`http://localhost:3000/get-recipe/${id}`, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// .then(res => res.json())
// .then(data => console.log(data))

//step 2 construct the backend
// step 3 test without data via thunder
//step 4 use this array to test it
//step 5 when all works then convert to nextjs

//path parameter in vanilla js


GET /recipes?name=Sadza
→ returns only recipes where name matches
frontend zou min of meer zou
fetch('http://localhost:3000/recipes?name=Sadza', {
  method: "GET",
  {
    Content-Type: application/JSON,
    Headers:athourization is for later,
    query: ?name=Sadza
  }
})

request={
  url: 'http://localhost:3000/recipes?name=Sadza',
  method: "GET",
  Content-Type: application/JSON,
  Headers: Authorization:  {Bearer token},
  query: ?name=Sadza
}

vanilla js
//backend rest api
app.get()