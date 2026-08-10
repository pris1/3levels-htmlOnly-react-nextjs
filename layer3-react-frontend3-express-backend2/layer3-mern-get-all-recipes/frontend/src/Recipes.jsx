import { useState } from 'react'

function Recipes() {
  //step4 the we are waiting for the data to come so we create a state for itbefore it arrives state is null or empty and will be updated by setData when teh data arrives from the backend
  //calling an existing function
  const [recipes, setRecipes] = useState([])

  function HandleClick() {
    fetch('http://localhost:3000/recipes')
      .then(function (responseObj) {
        //return a promise created by .json()
        return responseObj.json()
      })
      .then(function (data) {
        //set the
        setRecipes(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <button onClick={HandleClick}>Get recipes</button>

      <ul>
        {recipes.map(function (recipe) {
          return <li key={recipe.id}>{recipe.name}</li>
        })}
      </ul>
    </>
  )
}

export default Recipes
