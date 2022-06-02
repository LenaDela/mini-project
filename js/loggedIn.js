const URL = "https://reqres.in/api/login";

// async function postDataApi(email, password) {
  
//   try {
//     const response = await axios.post(URL, {
//       "email": email, 
//       "password": password
//     })
//     p.innerHTML = "Merci, vous vous êtes correctement authentifié.e"
//     window.localStorage.setItem(email, response.data.token)
//     window.location.replace("loggedIn.html")
//     console.log("SUCCESS", response.data)
//   } catch (err) {
//     p.innerHTML = "Désolé, authentification erronée. Veuillez réessayer."; 
//     window.location.replace("login.html")
//     console.log("ERROR", err)
//   }  
// }

if ( window.localStorage.email !== response.data.token ) {
    window.location.replace("loggedIn.html")
} 