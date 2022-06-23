const chuckNorris = "https://api.chucknorris.io/jokes/random";


async function getDataFromChuckApi() {
  const responseChuck = await axios.get(chuckNorris);

  let resultChuck = responseChuck.data.value;
  console.log(resultChuck);   

    let section = document.getElementById("quote");
    let div = document.getElementById("quote-frame");
    let p = document.getElementById("quote-here");

    div.appendChild(p);
    section.appendChild(div);
    p.innerHTML = resultChuck;

    div.className = "quotation-space";

}

//plutôt comme ce qui suit directement pour le onload/load -pour éviter que le window.onload n'écrase un autre window.onload. Il ne peut y en avoir deux en même temps, l'un prend forcément le dessus

window.addEventListener("load", () => {
  getDataFromChuckApi();

  const chuckBtn = document.getElementById("btn-quotation");
  chuckBtn.addEventListener("click", () => getDataFromChuckApi());
})

// window.onload = function () {
//   getDataFromChuckApi(chuckNorris);

//   const chuckBtn = document.getElementById("btn-quotation");
//   chuckBtn.addEventListener("click", () => getDataFromChuckApi(chuckNorris));
// }

