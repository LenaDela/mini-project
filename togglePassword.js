function init() {
  const togglePassword = document.getElementById("togglePassword");
  const password = document.querySelector("#password");
  togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
  });
}

window.onload = init;
