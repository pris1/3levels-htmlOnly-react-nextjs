import { useState } from 'react'

function Recipes() {
  //step4 the we are waiting for the data to come so we create a state for itbefore it arrives state is null or empty and will be updated by setData when teh data arrives from the backend
  //calling an existing functio
  const [recipe, setRecipe] = useState(null)
  const [name, setName] = useState('')

  function handleClick() {
    // your next step goes here
    const url = `http://localhost:3000/recipes?name=${name}`

    fetch(url)
      .then((resObj) => {
        return resObj.json()
      })
      .then(function (recipeData) {
        setRecipe(recipeData)
      })
  }

  return (
    <>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleClick}>Search</button>
      {recipe && <p>{recipe.name}</p>}
    </>
  )
}

export default Recipes
