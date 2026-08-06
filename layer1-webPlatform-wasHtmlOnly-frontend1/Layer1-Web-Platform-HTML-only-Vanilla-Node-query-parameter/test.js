let url = '/recipes?name=Pizza';
const splitUrl = url.split('?'); //now splitUrl has 2 array items we want the second one and split it again or i simply need to extract it
console.log(splitUrl);
const queryParam = splitUrl[1];
console.log(queryParam);
const splitQueryParam = queryParam.split('=');
console.log(splitQueryParam);
const valueOfKey = splitQueryParam[1];
console.log(valueOfKey);
