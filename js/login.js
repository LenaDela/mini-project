const URL = "https://reqres.in/api/login";

async function postDataApi(email, password) {
  
  let section = document.getElementById("message");
  let div = document.getElementById("error-message");
  let p = document.getElementById("specific-error");

  div.appendChild(p);
  section.appendChild(div);
  
  try {
    const response = await axios.post(URL, {
      "email": email,
      "password": password
    })
    p.innerHTML = "Merci, vous vous êtes correctement authentifié.e"
    window.localStorage.setItem(email, response.data.token)
    window.location.replace("loggedIn.html")
    console.log("SUCCESS", response.data)
  } catch (err) {
    p.innerHTML = "Désolé, authentification erronée. Veuillez réessayer."; 
    console.log("ERROR", err)
  }  
}

window.addEventListener("load", () => {

  let login = document.getElementById("loginForm")
  console.log(login);

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData(login);
    postDataApi(form.get("email"), form.get("password"));

    console.log(form.get("email"), form.get("password"));
  })
})

// async function login(email, password) {
//   const response = await axios.post(URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json", // not necessary, default 
//     },
//     body: {
//       email: email, // could simply write "email". If variable has same name as key, OK
//       password: password, // ""
//     },
//   });
//   console.log(response);
//   return response; 
// }

// login(URL, { answer: 42 }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call // though no longer necessary since we're now using axios.get
// });

