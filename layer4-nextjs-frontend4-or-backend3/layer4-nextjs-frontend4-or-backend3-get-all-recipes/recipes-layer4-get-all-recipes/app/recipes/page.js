async function getRecipes() {
  const response = await fetch('http://localhost:3000/api/recipes');
  return response.json();
}

export default async function Recipes() {
  const recipes = await getRecipes();

  return (
    <>
      <h1>Recipes page</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </>
  );
}
