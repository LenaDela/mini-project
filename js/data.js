const rickAndMortyApi = "https://rickandmortyapi.com/api/character";
const URL = "https://reqres.in/api/users?page=1";

const isVowelFilterActive = () =>
  document.getElementById("btn-vowel").innerHTML !== "Names starting with a vowel";

const isAlphabetFilterActive = () =>
  document.getElementById("btn-alphabet").innerHTML !== "Put in alphabetical order";

const isLengthFilterActive = () =>
  document.getElementById("btn-length").innerHTML !== "Names of five letters or less";

const isReplaceFilterActive = () =>
  document.getElementById("btn-replace").innerHTML !== "Wubba lubba dub dub";

let select = document.createElement("select");
select.setAttribute("id", "entries");

function renderSelectList(list, attributeName) {
  // console.log("list", list);
  if (document.getElementById("entries")) {
    document.getElementById("entries").remove();
  }
  
  document.getElementById("select-top-entry").appendChild(select);

  list.map((item) => {
    let option = document.createElement("option");
    select.appendChild(option);

    option.innerHTML = item[attributeName];

    option.className = "";
  });

  select.addEventListener("change", () => selectWho(list, attributeName, select));
}

// select.addEventListener("change", selectWho); // other way= of writing it
/** @param  {Array.<object>} list */
function selectWho(list, attributeName, select) {
  console.log("select.value", select.value);
  console.log("select", select);
  const topUser = list.find((listItem) => {
    if (listItem[attributeName] === select.value) {
      return true;
    } return false;
  });
  const filteredList = list.filter((item) =>  {
    if (item[attributeName] === select.value) {
      return false;
    } return true;
  });
  console.log("topUser", topUser);
  console.log("filteredList", filteredList);
  renderUserList({users:[topUser].concat(filteredList)})
  // renderUserList({users:[topUser, ...filteredList]})
}

// function renderSelectedUser({users, selectUser}) {
//   if (selectUser) {
//     filteredUsers = filteredUsers.filter((user)) =>

//   }
// }

function renderUserList({users, filterVowel, filterAlphabet, filterLength}) {
  // console.log("users", users);
  const tbody = document.getElementById("user-list");
  tbody.innerHTML = "";
  // console.log("filters", filterVowel, filterAlphabet, filterLength);
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
    // console.log(users);
    // console.log(filteredUsers);
  }

  if (filterLength) {
    filteredUsers = filteredUsers.filter(
      (user) => user?.last_name?.length <= 4
    );
    // console.log(users);
    // console.log(filteredUsers);
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
}

function renderCharacterList({characters, filterVowel, filterAlphabet, filterLength}) {
  // console.log("filterVowel", filterVowel);
  const tbodyRick = document.getElementById("character-list");
  tbodyRick.innerHTML = "";
  let filteredCharacters = [].concat(characters);
  // console.log("characters", characters);

  if (filterVowel) {
    filteredCharacters = filteredCharacters.filter((character) =>
      /^[aeiouy]/i.test(character.name)
    );
  }

  if (filterAlphabet) {
    filteredCharacters = filteredCharacters.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    // console.log("characters", characters);
    // console.log("filtered characters", filteredCharacters);
  }

  if (filterLength) {
    filteredCharacters = filteredCharacters.filter(
      (character) => character.name.length <= 5
    );
    // console.log("characters", characters);
    // console.log("filtered characters", filteredCharacters);
  }

  filteredCharacters.map((character) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let div = document.createElement("div");

    let img = new Image(); // It is functionally equivalent to document.createElement('img').
    img.src = character.image;
 
    tbodyRick.appendChild(tr);
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
  
function getUsersStartingWithVowel({users, characters, isVowelFilterActive, isAlphabetFilterActive, isLengthFilterActive, renderUserList, renderCharacterList, vowelBtn}) {
                            
  // console.log("isVowelFilterActive", isVowelFilterActive());
  if (!isVowelFilterActive()) {
    vowelBtn.innerHTML = "Show all";
    vowelBtn.style.backgroundColor = "#672634";
  } else {
    vowelBtn.innerHTML = "Names starting with a vowel";
    vowelBtn.style.backgroundColor = "#874A57";
  }
  // console.log("isVowelFilterActiveAfter", isVowelFilterActive());

  renderUserList({
    users:users,
    filterVowel:isVowelFilterActive(),
    filterAlphabet:isAlphabetFilterActive(),
    filterLength:isLengthFilterActive()
  });
  console.log("isLengthFilerActive", isLengthFilterActive());
  renderCharacterList({
    characters:characters,
    filterVowel:isVowelFilterActive(),
    filterAlphabet:isAlphabetFilterActive(),
    filterLength:isLengthFilterActive()
  });
}

function orderAlphabetically({users, characters, isVowelFilterActive, isAlphabetFilterActive, isLengthFilterActive, renderUserList, renderCharacterList, alphabetBtn }) {
  if (!isAlphabetFilterActive(alphabetBtn)) {
    alphabetBtn.innerHTML = "Regular List";
    alphabetBtn.style.backgroundColor = "#672634";
  } else {
    alphabetBtn.innerHTML = "Put in alphabetical order";
    alphabetBtn.style.backgroundColor = "#874A57";
  }
  renderUserList({
    users:users,
    filterVowel:isVowelFilterActive(),
    filterAlphabet:isAlphabetFilterActive(),
    filterLength:isLengthFilterActive(),
  });
  renderCharacterList({
    characters:characters,
    filterVowel:isVowelFilterActive(),
    filterAlphabet:isAlphabetFilterActive(),
    filterLength:isLengthFilterActive(),
  });
}

function getUsersShorterThanFiveLetters({users, characters, isVowelFilterActive, isAlphabetFilterActive, isLengthFilterActive, renderUserList, renderCharacterList, lengthBtn }) {
  if (!isLengthFilterActive(lengthBtn)) {
    lengthBtn.innerHTML = "All The Entries";
    lengthBtn.style.backgroundColor = "#672634";
  } else {
    lengthBtn.innerHTML = "Names of five letters or less";
    lengthBtn.style.backgroundColor = "#874A57";
  }
  renderUserList({
    users:users,
    filterVowel:isVowelFilterActive(),
    filterAlphabet:isAlphabetFilterActive(),
    filterLength:isLengthFilterActive(),
  });
  renderCharacterList({
    characters:characters,
    filterVowel:isVowelFilterActive(),
    filterAlphabet:isAlphabetFilterActive(),
    filterLength:isLengthFilterActive(),
  });
}

function replaceDataInTable(characters, users) {
const replaceBtn = document.getElementById("btn-replace");
  if (!isReplaceFilterActive()) {
    replaceBtn.innerHTML = "Previous Data";
    replaceBtn.style.backgroundColor = "#672634";
       (characters, "name");
    document.getElementById("teamTable").style.display = "none";
    document.getElementById("rickTable").style.display = null; // would be "table" otherwise, but null is safer, prevents mistakes
  } else {
    replaceBtn.innerHTML = "Wubba lubba dub dub";
    replaceBtn.style.backgroundColor = "#874A57";
    document.getElementById("teamTable").style.display = null;
    document.getElementById("rickTable").style.display = "none";
    renderSelectList(users, "last_name");
  }
}


async function getDataFromApi(URL, rickAndMortyApi) {
  const responseUser = await fetch(URL); // by default it's GET
  const responseRick = await fetch(rickAndMortyApi); // by default it's GET

  let resultUser = await responseUser.json();
  let resultRick = await responseRick.json();

  let tbody = document.createElement("tbody");
  tbody.setAttribute("id", "user-list");
  let tbodyRick = document.createElement("tbody");
  tbodyRick.setAttribute("id", "character-list");
  let tfoot = document.getElementById("tfoot");

  tfoot.parentNode.insertBefore(tbody, tfoot); // inserts tbody before tfoot in table
  console.log(document.getElementById("rickTable"));
  document.getElementById("rickTable").appendChild(tbodyRick);
  
  let users = resultUser.data;
  let characters = resultRick.results;
  // console.log("users", users);
  // console.log("characters", characters);
  // console.log("results", resultRick);

  
  renderUserList({users:users, filterVowel:false, filterAlphabet:false, filterLength:false});

  renderCharacterList({characters:characters, filterVowel:false, filterAlphabet:false, filterLength:false});

  const vowelBtn = document.getElementById("btn-vowel");
  const alphabetBtn = document.getElementById("btn-alphabet");
  const lengthBtn = document.getElementById("btn-length");
  const replaceBtn = document.getElementById("btn-replace");
  

  vowelBtn.addEventListener("click", () => getUsersStartingWithVowel({users:users, characters:characters, vowelBtn:vowelBtn, alphabetBtn:alphabetBtn, lengthBtn:lengthBtn, replaceBtn:replaceBtn, renderUserList:renderUserList, renderCharacterList:renderCharacterList, isVowelFilterActive:isVowelFilterActive, isAlphabetFilterActive:isAlphabetFilterActive, isLengthFilterActive:isLengthFilterActive, isReplaceFilterActive:isReplaceFilterActive}));

  alphabetBtn.addEventListener("click", () => orderAlphabetically({users:users, characters:characters, vowelBtn:vowelBtn, alphabetBtn:alphabetBtn, lengthBtn:lengthBtn, replaceBtn:replaceBtn, renderUserList:renderUserList, renderCharacterList:renderCharacterList, isVowelFilterActive:isVowelFilterActive, isAlphabetFilterActive:isAlphabetFilterActive, isLengthFilterActive:isLengthFilterActive, isReplaceFilterActive:isReplaceFilterActive}));

  lengthBtn.addEventListener("click", () => getUsersShorterThanFiveLetters({users:users, characters:characters, vowelBtn:vowelBtn, alphabetBtn:alphabetBtn, lengthBtn:lengthBtn, replaceBtn:replaceBtn, renderUserList:renderUserList, renderCharacterList:renderCharacterList, isVowelFilterActive:isVowelFilterActive, isAlphabetFilterActive:isAlphabetFilterActive, isLengthFilterActive:isLengthFilterActive, isReplaceFilterActive:isReplaceFilterActive}));

  replaceBtn.addEventListener("click", () => replaceDataInTable(characters, users));
  
  renderSelectList(users, "last_name"); ///???? why is it working, even though not writing "name"??
}

getDataFromApi(URL, rickAndMortyApi);