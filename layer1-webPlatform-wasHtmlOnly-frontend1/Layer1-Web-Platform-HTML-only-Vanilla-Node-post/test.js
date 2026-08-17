const contentType =
  'multipart/form-data; boundary=----WebKitFormBoundaryABC123';

const splitCpntentType = contentType.split('=');
const boundary = splitCpntentType[1];
console.log(boundary);
