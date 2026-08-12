import { useState } from 'react'

function Recipes() {
  //step4 the we are waiting for the data to come so we create a state for itbefore it arrives state is null or empty and will be updated by setData when teh data arrives from the backend
  //calling an existing function
  const [recipe, setRecipes] = useState(null)

  function HandleClick() {
    fetch('http://localhost:3000/recipes/12')
      .then(function (responseObj) {
        //return a promise created by .json()
        return responseObj.json()
      })
      .then(function (data) {
        //set the
        console.log(data)
        setRecipes(data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <button onClick={HandleClick}>Get recipes</button>
      {/* h2 for semantics becoz its a heading */}
      {recipe && <h2>{recipe.name}</h2>}
    </>
  )
}

export default Recipes
