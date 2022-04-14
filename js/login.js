const URL = "https://reqres.in/api/login";

// async function postDataApi(URL) {
//   const response = await fetch(URL, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//           "email": "eve.holt@reqres.in",
//           "password": "cityslicka"
//         })

// }

// response.json().then(data => {
//   console.log(data);
// });
// }

// window.onload = init;
//onclick

const sendBtn = document.getElementById("sendBtn")
sendBtn.addEventListener("click", login())

async function login(email, password) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // not necessary, default 
    },
    body: {
      email: email, // could simply write "email". If variable has same name as key, OK
      password: password, // ""
    },
  });
  console.log(response);
  return response.json(); // parses JSON response into native JavaScript objects
}

login(URL, { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});

