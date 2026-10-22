fetch('/recipes')
  .then(function (response) {
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.ok);
      console.log(response);

    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
  })
  .then(function (recipesData) {
    const list = document.getElementById('recipe-list');

    recipesData.forEach(function (recipe) {
      const listItem = document.createElement('li');

      listItem.textContent = recipe.name;

      list.appendChild(listItem);
    });
  })
  .catch(function (error) {
    console.log('Something went wrong:', error);
  });
