// import 'node-fetch';
const URL = "https://reqres.in/api/users?page=1";

async function getDataFromApi(URL) {
  const response = await fetch(URL); // by default it's GET
  console.log(response);

  let result = await response.json();
  console.log(result);

  let tbody = document.createElement("tbody");
  let tfoot = document.getElementById("tfoot");
  tfoot.parentNode.insertBefore(tbody, tfoot); // inserts tbody before tfoot in table
  let users = result.data;

  console.log(users);

  users.map((user) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let div = document.createElement("div");

    let img = new Image(); // It is functionally equivalent to document.createElement('img').
    img.src = user.avatar;

    tbody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td.innerHTML = user.last_name;
    td2.innerHTML = user.first_name;
    td3.innerHTML = user.email;
    td4.appendChild(div);
    div.appendChild(img);

    tr.className = "colleague";
    td.className = "lastname";
    td2.className = "firstname";
    td3.className = "role";
    td4.className = "image-container";
    div.className = "styling-image";
  });

  // for (let index = 0; index < array.length; index++) {
  //   let tr = document.createElement("tr");
  //   let td = document.createElement("td");
  //   let td2 = document.createElement("td");
  //   let td3 = document.createElement("td");
  //   let td4 = document.createElement("td");

  //   // let image = document.createElement("img")
  //   let img = new Image();
  //   img.src = array[index].avatar;

  //   tbody.appendChild(tr);
  //   tr.appendChild(td);
  //   tr.appendChild(td2);
  //   tr.appendChild(td3);
  //   tr.appendChild(td4);
  //   td.innerHTML = array[index].last_name;
  //   td2.innerHTML = array[index].first_name;
  //   td3.innerHTML = array[index].email;
  //   td4.appendChild(img);

  //   tr.className = "colleague";
  //   td.className = "lastname";
  //   td2.className = "firstname";
  //   td3.className = "role";
  //   td4.className = "text-center";

  //   console.log(array[index]);
  // }
}

getDataFromApi(URL);

/* CHUCK NORRIS API EXAMPLE */
const quotesApi = "https://api.chucknorris.io/jokes/random";

async function getQuote(quotesApi) {
  const response = await fetch(quotesApi); // by default it's GET
  console.log(response);

  let result = await response.json();
  console.log(result);

  let footer = document.getElementById("footer");
  let pQuote = document.createElement("p");
  footer.parentNode.insertBefore(pQuote, footer);

  let quotes = result.value;
  console.log(quotes);

  pQuote.innerHTML = quotes;
}
getQuote(quotesApi);

/* RICK AND MORTY API EXAMPLE */
const charactersApi = "https://rickandmortyapi.com/api/character";

async function getCharacter(charactersApi) {
  const response = await fetch(charactersApi);
  console.log(response);

  let result = await response.json();
  console.log(result);

  let footer = document.getElementById("footer");
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  footer.parentNode.insertBefore(table, footer);

  let characters = result.results;
  console.log(characters);

  characters.map((character) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let div = document.createElement("div");

    let img = new Image(); // It is functionally equivalent to document.createElement('img').
    img.src = character.image;

    table.appendChild(tbody);
    tbody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    td.innerHTML = character.name;
    td2.innerHTML = character.status;
    td3.innerHTML = character.species;
    td4.innerHTML = character.gender;
    td5.appendChild(div);
    div.appendChild(img);

    tr.className = "colleague";
    td.className = "lastname";
    td2.className = "firstname";
    td3.className = "role";
    td4.className = "role";
    td5.className = "image-container";
    div.className = "styling-image";
  });
}

getCharacter(charactersApi);

/* POKEMON API EXAMPLE */
const pokemonApi = "https://pokeapi.co/api/v2/pokemon/?limit=151";

async function getPokemon(pokemonApi) {
  const response = await fetch(pokemonApi);
  console.log(response);

  let result = await response.json();
  console.log(result);

  let footer = document.getElementById("footer");
  let div = document.createElement("div");
  div.setAttribute("id", "poke-list");
  div.className = "align-middle";

  footer.parentNode.insertBefore(div, footer);

  let pokemons = result.results;
  console.log(pokemons);

  /************************************** */

  // const alphabetBtn = document.getElementById("btn-alphabet");
  // alphabetBtn.addEventListener("click", changeColor);
  // function changeColor() {
  //   alphabetBtn.style.color = "blue";
  // }

  // const alphabetBtn = document.getElementById("btn-alphabet");
  // alphabetBtn.addEventListener("click", changeOrder);
  // function changeOrder() {
  //   alphabetBtn.sort();
  // }
  // console.log(alphabetBtn);

  // function f_sort(list) {

  //   return list.sort((a, b) => a.name.localeCompare(b.name));
  // }
  // console.log(f_sort(pokemons));

  /************************************** */

  function renderPokeList(filterVowel, filterAlphabet, filterLength) {
    const pokeList = document.getElementById("poke-list");
    pokeList.innerHTML = "";
    // added "[].concat()" instead of just "pokemons". Try to understand why
    let filteredPokemon = [].concat(pokemons);

    if (filterVowel) {
      filteredPokemon = filteredPokemon.filter((pokemon) =>
        /^[aeiouy]/i.test(pokemon.name)
      );
    }

    if (filterAlphabet) {
      filteredPokemon = filteredPokemon.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      console.log(pokemons);
      console.log(filteredPokemon);
    }

    if (filterLength) {
      filteredPokemon = filteredPokemon.filter((pokemon) =>
        pokemon.name.length <= 5);
    }

    // const filterPokemon = (pokemon) => {
    //   /**if (filterVowel === true), boolean */
    //   if (filterVowel) {
    //     return (/^[aeiouy]/i.test(pokemon.name))
    //   }
    //   return true;
    // }

    // pokemons.filter(filterPokemon).map((pokemon) => {
    filteredPokemon.map((pokemon) => {
      let div1 = document.createElement("div");
      let p1 = document.createElement("p");
      let a = document.createElement("a");

      let img = new Image(); // It is functionally equivalent to document.createElement('img').
      img.src = "../media/pokeball4.png";

      pokeList.appendChild(div1);
      div1.appendChild(p1);
      div1.appendChild(a);
      p1.innerHTML = pokemon.name;
      a.href = pokemon.url;
      a.target = "_blank";
      a.appendChild(img);

      div1.className = "pokecard";
      p1.className = "poke-name";
      a.className = "poke-link";
      img.className = "poke-img";
    });
  }
  renderPokeList(false);

  const vowelBtn = document.getElementById("btn-vowel");
  const alphabetBtn = document.getElementById("btn-alphabet");
  const lengthBtn = document.getElementById("btn-five-letters");

  const isVowelFilterActive = () =>
    vowelBtn.innerHTML !== "Names starting with a vowel";
  //function isFilteringVowels() {
  //  return (vowelBtn.innerHTML != "Names starting with a vowel")
  // }
  const isAlphabetFilterActive = () =>
    alphabetBtn.innerHTML !== "Put in alphabetical order";

  const isLengthFilterActive = () =>
    lengthBtn.innerHTML !== "Names of five letters or less";

  vowelBtn.addEventListener("click", getPokesStartingWithVowel);
  function getPokesStartingWithVowel() {
    if (!isVowelFilterActive()) {
      // if (vowelBtn.innerHTML ===  "Names starting with a vowel") {
      vowelBtn.innerHTML = "Show all";
      vowelBtn.style.backgroundColor = "#672634";
    } else {
      // vowelBtn.style.backgroundColor = "#874a5799";
      vowelBtn.innerHTML = "Names starting with a vowel";
      vowelBtn.style.backgroundColor = "#874A57";
    }
    renderPokeList(
      isVowelFilterActive(),
      isAlphabetFilterActive(),
      isLengthFilterActive()
    );
  }

  alphabetBtn.addEventListener("click", orderAlphabetically);
  function orderAlphabetically() {
    if (!isAlphabetFilterActive()) {
      // if (alphabetBtn.innerHTML === "Put in alphabetical order") {
      alphabetBtn.innerHTML = "Regular List";
      alphabetBtn.style.backgroundColor = "#672634";
    } else {
      alphabetBtn.innerHTML = "Put in alphabetical order";
      alphabetBtn.style.backgroundColor = "#874A57";
    }
    renderPokeList(
      isVowelFilterActive(),
      isAlphabetFilterActive(),
      isLengthFilterActive()
    );
  }

  lengthBtn.addEventListener("click", getPokesLongerThanSixLetters);
  function getPokesLongerThanSixLetters() {
    if (!isLengthFilterActive()) {
      lengthBtn.innerHTML = "All Pokemon";
      lengthBtn.style.backgroundColor = "#672634";
    } else {
      lengthBtn.innerHTML = "Names of five letters or less";
      lengthBtn.style.backgroundColor = "#874A57";
    }
    renderPokeList(
      isVowelFilterActive(),
      isAlphabetFilterActive(),
      isLengthFilterActive()
    );
  }
}

getPokemon(pokemonApi);
