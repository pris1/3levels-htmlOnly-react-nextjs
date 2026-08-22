 const inputRecipe= document.querySelector('#recipe');
            const inputFileUpload = document.querySelector('#fileUpload');
            const button = document.querySelector('button');
      const result = document.querySelector('#result')

      button.addEventListener('click', () => {
        //step1 extract the text input value
        const inputValue = inputRecipe.value;
        //step2 extract the selected file object
        const fileValue = inputFileUpload.files[0];

        const formData = new FormData();
         formData.set('name', inputValue);
         formData.set('recipeFile', fileValue);

         fetch('http://localhost:3000', {
          method: 'POST',
          headers: {'Content-Text': 'multipart/form-data'},

          body: formData
         }
         )
      })