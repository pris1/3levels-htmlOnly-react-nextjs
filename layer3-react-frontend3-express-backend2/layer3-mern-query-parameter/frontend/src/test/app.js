const input = document.querySelector('input')
const button = document.querySelector('button')
const p = document.querySelector('p')
// const inpObj = { age: 12 }
// console.log(inpObj)

button.addEventListener('click', () => {
  const inpValue = input.value

  const url = `http://localhost:3000/recipes?name=${inpValue}`
  fetch(url)
    .then(function (resObj) {
      return resObj.json()
    })
    .then(function (recipeData) {
      if (recipeData.message) {
        p.innerText = recipeData.message
      } else {
        p.innerText = recipeData.name
      }
    })
    .catch(function (error) {
      console.log('error')
    })
})
