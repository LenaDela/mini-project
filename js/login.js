const URL = "https://reqres.in/api/login";

async function postDataApi(URL) {
  const response = await fetch(URL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },

}
// function init () {
// const response = await fetch("https://reqres.in/api/login", {
//   method: 'POST',
//   body: {
//     "email": "eve.holt@reqres.in",
//     "password": "cityslicka"
//     },
// });

// response.json().then(data => {
//   console.log(data);
// });
// }

// window.onload = init;