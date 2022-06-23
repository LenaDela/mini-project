const URL = "https://reqres.in/api/login";

// quand on compare à NULL en JS, il vaut mieux mettre seulement == plutôt que ===, parce qu'ainsi on vérifie null (il y a un token qui ne vaut rien du tout) et undefined (il n'y a pas de token)
if (window.localStorage.getItem("token") == null) { 
    window.location.replace("login.html")
} 