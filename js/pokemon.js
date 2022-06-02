/* POKEMON API EXAMPLE */
const pokemonApi = "https://pokeapi.co/api/v2/pokemon/?limit=151";

async function getPokemon(pokemonApi) {
  const response = await axios.get(pokemonApi);
  console.log(response);

  let result = response;
  console.log(result);

  let footer = document.getElementById("footer");
  let div = document.createElement("div");
  div.setAttribute("id", "poke-list");
  div.className = "align-middle";

  footer.parentNode.insertBefore(div, footer);

  let pokemons = result.results;
  console.log(pokemons);

  function renderPokeList(
    filterVowel,
    filterAlphabet,
    filterLength,
    // filterFindHide
  ) {
    div.innerHTML = "";
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
      filteredPokemon = filteredPokemon.filter(
        (pokemon) => pokemon.name.length <= 5
      );
    }

    // ******WTF AM I WRITING?? Not good... *******
    // if (filterFindHide) {
    //   filteredPokemon = filteredPokemon.display = "none";
    // }

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

      div.appendChild(div1);
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
  const findHideBtn = document.getElementById("btn-find-hide");
  // const findHideBtn = document.getElementById("btn-find-hide").style.visibility="hidden"; that's just hidding the button, which is not what we want

  const isVowelFilterActive = () =>
    vowelBtn.innerHTML !== "Names starting with a vowel";

  const isAlphabetFilterActive = () =>
    alphabetBtn.innerHTML !== "Put in alphabetical order";

  const isLengthFilterActive = () =>
    lengthBtn.innerHTML !== "Names of five letters or less";

  const isFindHideFilterActive = () =>
    findHideBtn.innerHTML !== "Hide the Pokemon";

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
      isLengthFilterActive(),
      isFindHideFilterActive()
    );
  }

  alphabetBtn.addEventListener("click", orderAlphabetically);
  function orderAlphabetically() {
    if (!isAlphabetFilterActive()) {
      alphabetBtn.innerHTML = "Regular List";
      alphabetBtn.style.backgroundColor = "#672634";
    } else {
      alphabetBtn.innerHTML = "Put in alphabetical order";
      alphabetBtn.style.backgroundColor = "#874A57";
    }
    renderPokeList(
      isVowelFilterActive(),
      isAlphabetFilterActive(),
      isLengthFilterActive(),
      isFindHideFilterActive()
    );
  }

  lengthBtn.addEventListener("click", getPokesShorterThanSixLetters);
  function getPokesShorterThanSixLetters() {
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
      isLengthFilterActive(),
      isFindHideFilterActive()
    );
  }

  findHideBtn.addEventListener("click", hidePokemon);
  function hidePokemon() {
    if (!isFindHideFilterActive()) {
      findHideBtn.innerHTML = "Find the Pokemon";
      findHideBtn.style.backgroundColor = "#672634";
      document.getElementById("poke-list").style.display = "none";
    } else {
      findHideBtn.innerHTML = "Hide the Pokemon";
      findHideBtn.style.backgroundColor = "#874A57";
      document.getElementById("poke-list").style.display = "flex";
    }
    renderPokeList(
      isVowelFilterActive(),
      isAlphabetFilterActive(),
      isLengthFilterActive(),
      isFindHideFilterActive()
    );
  }
}

getPokemon(pokemonApi);
