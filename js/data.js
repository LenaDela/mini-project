const rickAndMortyApi = "https://rickandmortyapi.com/api/character";

// async function getRickAndMortyCharacters(rickAndMortyApi) {
//   // this part and the one at the bottom?
//   const responseRick = await fetch(rickAndMortyApi);
//   console.log(responseRick);

//   let resultRick = await responseRick.json();
//   console.log(resultRick);

//   let users = result.results;
//   console.log(users);
// }
// getRickAndMortyCharacters(rickAndMortyApi);

const URL = "https://reqres.in/api/users?page=1";

const isVowelFilterActive = (vowelBtn) =>
    vowelBtn.innerHTML !== "Names starting with a vowel";

const isAlphabetFilterActive = (alphabetBtn) =>
    alphabetBtn.innerHTML !== "Put in alphabetical order";

const isLengthFilterActive = (lengthBtn) =>
    lengthBtn.innerHTML !== "Names of four letters or less";

const isReplaceFilterActive = (replaceBtn) =>
    replaceBtn.innerHTML !== "Wubba lubba dub dub";

async function getDataFromApi(URL, rickAndMortyApi) {
  const responseUser = await fetch(URL); // by default it's GET
  const responseRick = await fetch(rickAndMortyApi); // by default it's GET
  console.log(responseUser);
  console.log(responseRick);

  let resultUser = await responseUser.json();
  let resultRick = await responseRick.json();
  console.log(resultUser);

  let tbody = document.createElement("tbody");
  let tbodyRick = document.createElement("tbody");
  let tfoot = document.getElementById("tfoot");
  let divList = document.createElement("div");
  divList.setAttribute("id", "user-list");
  let divRickAndMorty = document.createElement("div");
  divRickAndMorty.setAttribute("id", "rick-and-morty-list");
  divRickAndMorty.style.display = "none";

  tfoot.parentNode.insertBefore(tbody, tfoot); // inserts tbody before tfoot in table
  document.getElementById("rickTable").appendChild(tbodyRick);
  tbodyRick.appendChild(divRickAndMorty);
  
  let users = resultUser.data;
  let characters = resultRick.results;
  console.log("users", users);
  console.log("characters", characters);
  console.log("results", resultRick);

  function renderUserList(filterVowel, filterAlphabet, filterLength) {
    divList.innerHTML = "";
    let filteredUsers = [].concat(users);

    if (filterVowel) {
      filteredUsers = filteredUsers.filter((user) =>
        /^[aeiouy]/i.test(user.first_name)
      );
    }

    if (filterAlphabet) {
      filteredUsers = filteredUsers.sort((a, b) =>
        a.last_name.localeCompare(b.last_name)
      );
      console.log(users);
      console.log(filteredUsers);
    }

    if (filterLength) {
      filteredUsers = filteredUsers.filter(
        (user) => user.last_name.length <= 4
      );
      console.log(users);
      console.log(filteredUsers);
    }

    filteredUsers.map((user) => {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let div = document.createElement("div");

      let img = new Image(); // It is functionally equivalent to document.createElement('img').
      img.src = user.avatar;

      tbody.appendChild(divList);
      divList.appendChild(tr);
      tr.appendChild(td);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      td.innerHTML = user.last_name;
      td2.innerHTML = user.first_name;
      td3.innerHTML = user.email;
      td4.appendChild(div);
      div.appendChild(img);

      // divList = "team-table";
      tr.className = "colleague";
      td.className = "lastname";
      td2.className = "firstname";
      td3.className = "role";
      td4.className = "image-container";
      div.className = "styling-image";
    });
  }
  renderUserList(divList, users);

  renderCharacterList(divRickAndMorty, characters);

  const vowelBtn = document.getElementById("btn-vowel");
  const alphabetBtn = document.getElementById("btn-alphabet");
  const lengthBtn = document.getElementById("btn-five-letters");
  const replaceBtn = document.getElementById("btn-replace");


  vowelBtn.addEventListener("click", () => getUsersStartingWithVowel(users, characters, replaceBtn));

  alphabetBtn.addEventListener("click", () => orderAlphabetically(users, characters, replaceBtn));

  lengthBtn.addEventListener("click", () => getUsersShorterThanFiveLetters(users, characters,replaceBtn));
 

  replaceBtn.addEventListener("click", () => replaceDataInTable(users, characters, replaceBtn));
  

  renderSelectList(users, "last_name");
}

function renderCharacterList(divRickAndMorty, characters, filterVowel, filterAlphabet, filterLength) {
  divRickAndMorty.innerHTML = "";
  let filteredCharacters = [].concat(characters);
  console.log("characters", characters);

  if (filterVowel) {
    filteredCharacters = filteredCharacters.filter((character) =>
      /^[aeiouy]/i.test(character.name)
    );
  }

  if (filterAlphabet) {
    filteredCharacters = filteredCharacters.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    console.log("characters", characters);
    console.log("filtered characters", filteredCharacters);
  }

  if (filterLength) {
    filteredCharacters = filteredCharacters.filter(
      (character) => character.name.length <= 5
    );
    console.log("characters", characters);
    console.log("filtered characters", filteredCharacters);
  }

  filteredCharacters.map((character) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let div = document.createElement("div");

    console.log(character);
    let img = new Image(); // It is functionally equivalent to document.createElement('img').
    img.src = character.image;

 
    divRickAndMorty.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td.innerHTML = character.name;
    td2.innerHTML = character.status;
    td3.innerHTML = character.species;
    td4.appendChild(div);
    div.appendChild(img);

    tr.className = "character";
    td.className = "name-rick";
    td2.className = "status";
    td3.className = "species";
    td4.className = "image-container";
    div.className = "styling-image";
  });
}

function getUsersStartingWithVowel(vowelBtn, alphabetBtn, lengthBtn, replaceBtn) {
  if (!isVowelFilterActive(vowelBtn)) {
    vowelBtn.innerHTML = "Show all";
    vowelBtn.style.backgroundColor = "#672634";
  } else {
    vowelBtn.innerHTML = "Names starting with a vowel";
    vowelBtn.style.backgroundColor = "#874A57";
  }
  renderUserList(
    isVowelFilterActive(vowelBtn),
    isAlphabetFilterActive(alphabetBtn),
    isLengthFilterActive(lengthBtn),
    isReplaceFilterActive(replaceBtn)
  );
  renderCharacterList(
    isVowelFilterActive(vowelBtn),
    isAlphabetFilterActive(alphabetBtn),
    isLengthFilterActive(lengthBtn),
    isReplaceFilterActive(replaceBtn)
  );
}

function getUsersShorterThanFiveLetters(vowelBtn, alphabetBtn, lengthBtn, replaceBtn) {
  if (!isLengthFilterActive(lengthBtn)) {
    lengthBtn.innerHTML = "All The Entries";
    lengthBtn.style.backgroundColor = "#672634";
  } else {
    lengthBtn.innerHTML = "Names of four letters or less";
    lengthBtn.style.backgroundColor = "#874A57";
  }
  renderUserList(
    isVowelFilterActive(vowelBtn),
    isAlphabetFilterActive(alphabetBtn),
    isLengthFilterActive(lengthBtn),
    isReplaceFilterActive(replaceBtn)
  );
  renderCharacterList(
    isVowelFilterActive(vowelBtn),
    isAlphabetFilterActive(alphabetBtn),
    isLengthFilterActive(lengthBtn),
    isReplaceFilterActive(replaceBtn)
  );
}

function orderAlphabetically(vowelBtn, alphabetBtn, lengthBtn, replaceBtn) {
  if (!isAlphabetFilterActive(alphabetBtn)) {
    alphabetBtn.innerHTML = "Regular List";
    alphabetBtn.style.backgroundColor = "#672634";
  } else {
    alphabetBtn.innerHTML = "Put in alphabetical order";
    alphabetBtn.style.backgroundColor = "#874A57";
  }
  renderUserList(
    isVowelFilterActive(vowelBtn),
    isAlphabetFilterActive(alphabetBtn),
    isLengthFilterActive(lengthBtn),
    isReplaceFilterActive(replaceBtn)
  );
  renderCharacterList(
    isVowelFilterActive(vowelBtn),
    isAlphabetFilterActive(alphabetBtn),
    isLengthFilterActive(lengthBtn),
    isReplaceFilterActive(replaceBtn)
  );
}

function renderSelectList(list, attributeName) {
  if (document.getElementById("entries")) {
    document.getElementById("entries").remove();
  }
  let select = document.createElement("select");
  select.setAttribute("id", "entries");
  document.getElementById("select-top-entry").appendChild(select);

  list.map((item) => {
    let option = document.createElement("option");
    select.appendChild(option);

    option.innerHTML = item[attributeName];

    option.className = "";
  });
}

function replaceDataInTable(characters, replaceBtn) {
  if (!isReplaceFilterActive(replaceBtn)) {
    replaceBtn.innerHTML = "Previous Data";
    replaceBtn.style.backgroundColor = "#672634";
    renderSelectList(characters, "name");
    document.getElementById("user-list").style.display = "none";
    document.getElementById("rick-and-morty-list").style.display = "block";
  } else {
    replaceBtn.innerHTML = "Wubba lubba dub dub";
    replaceBtn.style.backgroundColor = "#874A57";
    document.getElementById("user-list").style.display = "block";
    document.getElementById("rick-and-morty-list").style.display = "none";
    renderSelectList(users, "last_name");
  }
}

getDataFromApi(URL, rickAndMortyApi);
