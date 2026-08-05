const http = require('http');
const server = http.Createserver((req, res) => {
  // If(req.method==="GET"){
  // If (req.url==='/'){
  // Let html = `
  // <input name="name" placeholder="Enter recipe name"/>
  // `;
  // Res.end(html);
  // Return;
  // }
  // If(req.url==='/recipes?name=Pizza'){
  // Let url='/recipes?name=Pizza';
  // const splitUrl = url.split("?");//now splitUrl has 2 array items we want the second one and split it again or i simply need to extract it
  // console.log(splitUrl);
  // Const queryParam = splitUrl[1];
  // //using this query parameter to search in the array
  // //the name on the left side is from the array and name on the right side is from the query parameter
  // For (let recipe of recipes) {
  // If(recipe.name === name){
  // Res.end('This is your found Recipe ${name}
  // }
  // Res.end('Recipe not found');
  // }
  // }
  // Res.end('Route not found');
  // Return;
  // }
  // Res.end('method not allowed');
});
server(3000, () => {
  console.log('server is running');
});
