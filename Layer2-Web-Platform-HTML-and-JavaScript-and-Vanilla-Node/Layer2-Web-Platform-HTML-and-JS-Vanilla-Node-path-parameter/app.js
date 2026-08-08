fetch('/recipes/1')
  .then(function (response) {
    return response.json();
  })
  .then(function (recipesData) {
    console.log(recipesData);

    const p = document.createElement('p');
    p.textContent = recipesData.name;
    document.body.appendChild(p);
  })
  .catch(function (error) {
    console.log(error);
  });
