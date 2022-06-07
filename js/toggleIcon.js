function init() {
  const toggleIcon = document.getElementById("toggleIcon")
  toggleIcon.addEventListener("click", toggleVisibility)

  function toggleVisibility() {
    const passwordInput = document.getElementById("password")
    const icon = document.getElementById("icon")
    if (passwordInput.type === "password") {
      passwordInput.type = "text"
      icon.classList.add('fa-eye-slash');
      icon.classList.remove('fa-eye');
    } else {
      passwordInput.type = "password"
      // icon = document.getElementsByClassName("fa-eye-slash") /* that's not right...it doesn't work */
      icon.classList.add('fa-eye');
      icon.classList.remove('fa-eye-slash');
    }   
  }
}

window.onload = init;


// const response = await fetch("https://reqres.in/api/login", {
//   method: 'POST',
//   headers: {
//     // "Accept": 
//   },
//   body: {

//   },
// });

// response.json().then(data => {
//   console.log(data);
// });