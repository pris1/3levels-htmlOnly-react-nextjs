'use client';

import { useEffect, useState } from 'react';

export default function RecipesClient() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
    }

    getRecipes();
  }, []);

  return (
    <>
      <h1>Recipes — Client Component</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </>
  );
}
