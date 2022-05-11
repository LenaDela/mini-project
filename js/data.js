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


function renderSelectList(list) {
  
  const select = document.getElementById("entries");
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  list.map((item) => {
    let option = document.createElement("option");
    select.appendChild(option);

    option.innerHTML = item.name;
  });
}

  function reorderList(list, attributeName) {
  console.log("attibuteName", attributeName);
  
  const select = document.getElementById("entries");
  const topUser = list.find((listItem) => listItem[attributeName] === select.value);
  const filteredList = list.filter((item) => item[attributeName] !== select.value);

  console.log("topUser", topUser);
  console.log("filteredList", filteredList);
  if (attributeName === "last_name") {
    return renderList({users: [topUser].concat(filteredList)});
    // renderList({users:[topUser, ...filteredList]})
  } 
  return renderCharacterList({characters: [topUser].concat(filteredList)});
}

function renderList({listToRender, filterVowel, filterAlphabet, filterLength, bodyId}) {
  // console.log("users", users);
  const tbody = document.getElementById(bodyId);
  tbody.innerHTML = "";
  let filteredListToRender = [].concat(listToRender);
  // console.log("filters", filterVowel, filterAlphabet, filterLength);

  if (filterVowel) {
    filteredListToRender = filteredListToRender.filter((listItem) =>
      /^[aeiouy]/i.test(listItem.name)
    );
  }

  if (filterAlphabet) {
    filteredListToRender = filteredListToRender.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (filterLength) {
    filteredListToRender = filteredListToRender.filter(
      (listItem) => listItem?.name?.length <= 4
    );
  }
console.log("filteredListToRender", filteredListToRender, listToRender);
  filteredListToRender.map((listItem) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let div = document.createElement("div");

    let img = new Image(); // It is functionally equivalent to document.createElement('img').
    img.src = listItem.image;

    tbody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td.innerHTML = listItem.name;
    td2.innerHTML = listItem.first_name;
    td3.innerHTML = listItem.contact;
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
  
function isUserListVisible() {
  const table = document.getElementById("teamTable");
  return table.style.display !== "none";
}


function getUsersStartingWithVowel({users, characters, isVowelFilterActive, isAlphabetFilterActive, isLengthFilterActive, renderList, vowelBtn}) {
                            
  // console.log("isVowelFilterActive", isVowelFilterActive());
  if (!isVowelFilterActive()) {
    vowelBtn.innerHTML = "Show all";
    vowelBtn.style.backgroundColor = "#672634";
  } else {
    vowelBtn.innerHTML = "Names starting with a vowel";
    vowelBtn.style.backgroundColor = "#874A57";
  }
  // console.log("isVowelFilterActiveAfter", isVowelFilterActive());

  renderList({
    users:users, /* + characters:characters??? */
    filterVowel:isVowelFilterActive(),
    filterAlphabet:isAlphabetFilterActive(),
    filterLength:isLengthFilterActive()
  });
  console.log("isLengthFilerActive", isLengthFilterActive());
}

function orderAlphabetically({users, characters, isVowelFilterActive, isAlphabetFilterActive, isLengthFilterActive, renderList, renderCharacterList, alphabetBtn }) {
  if (!isAlphabetFilterActive(alphabetBtn)) {
    alphabetBtn.innerHTML = "Regular List";
    alphabetBtn.style.backgroundColor = "#672634";
  } else {
    alphabetBtn.innerHTML = "Put in alphabetical order";
    alphabetBtn.style.backgroundColor = "#874A57";
  }
  renderList({
    users:users, /* + characters:characters??? */
    filterVowel:isVowelFilterActive(),
    filterAlphabet:isAlphabetFilterActive(),
    filterLength:isLengthFilterActive(),
  });
}

function getUsersShorterThanFiveLetters({users, characters, isVowelFilterActive, isAlphabetFilterActive, isLengthFilterActive, renderList, renderCharacterList, lengthBtn }) {
  if (!isLengthFilterActive(lengthBtn)) {
    lengthBtn.innerHTML = "All The Entries";
    lengthBtn.style.backgroundColor = "#672634";
  } else {
    lengthBtn.innerHTML = "Names of five letters or less";
    lengthBtn.style.backgroundColor = "#874A57";
  }
  renderList({
    users:users, /* + characters:characters??? */
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
    renderSelectList(characters, "name");
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
  
  let users = resultUser.data.map((user) => ({...user, name: user.last_name, image: user.avatar, contact: user.email}) );
  console.log("users", users);
  let characters = resultRick.results.map((character) => {
    const splittedName = character.name.split(' ');
    return ({...character, first_name: splittedName[0], name: splittedName[splittedName.length - 1], contact: character.location.name 
  })});
  console.log("characters", characters);
  // console.log("users", users);
  // console.log("characters", characters);
  // console.log("results", resultRick);

  //renderList({users:users, characters:characters,?????? filterVowel:false, filterAlphabet:false, filterLength:false});

  renderList({listToRender:users, filterVowel:false, filterAlphabet:false, filterLength:false, bodyId: "user-list"});
  renderList({listToRender:characters, filterVowel:false, filterAlphabet:false, filterLength:false, bodyId: "character-list"});

  // renderCharacterList({listToRender:characters, filterVowel:false, filterAlphabet:false, filterLength:false});

  const vowelBtn = document.getElementById("btn-vowel");
  const alphabetBtn = document.getElementById("btn-alphabet");
  const lengthBtn = document.getElementById("btn-length");
  const replaceBtn = document.getElementById("btn-replace");
  const select =  document.getElementById("entries");

  // select.addEventListener("change", reorderList); // other way= of writing the function
  select.addEventListener("change", () => reorderList(isUserListVisible()? users : characters, isUserListVisible()? "last_name" : "name"));

  vowelBtn.addEventListener("click", () => getUsersStartingWithVowel({users:users, characters:characters, vowelBtn:vowelBtn, alphabetBtn:alphabetBtn, lengthBtn:lengthBtn, replaceBtn:replaceBtn, renderList:renderList, renderCharacterList:renderCharacterList, isVowelFilterActive:isVowelFilterActive, isAlphabetFilterActive:isAlphabetFilterActive, isLengthFilterActive:isLengthFilterActive, isReplaceFilterActive:isReplaceFilterActive}));

  alphabetBtn.addEventListener("click", () => orderAlphabetically({users:users, characters:characters, vowelBtn:vowelBtn, alphabetBtn:alphabetBtn, lengthBtn:lengthBtn, replaceBtn:replaceBtn, renderList:renderList, renderCharacterList:renderCharacterList, isVowelFilterActive:isVowelFilterActive, isAlphabetFilterActive:isAlphabetFilterActive, isLengthFilterActive:isLengthFilterActive, isReplaceFilterActive:isReplaceFilterActive}));


  lengthBtn.addEventListener("click", () => getUsersShorterThanFiveLetters({users:users, characters:characters, vowelBtn:vowelBtn, alphabetBtn:alphabetBtn, lengthBtn:lengthBtn, replaceBtn:replaceBtn, renderList:renderList, renderCharacterList:renderCharacterList, isVowelFilterActive:isVowelFilterActive, isAlphabetFilterActive:isAlphabetFilterActive, isLengthFilterActive:isLengthFilterActive, isReplaceFilterActive:isReplaceFilterActive}));

  replaceBtn.addEventListener("click", () => replaceDataInTable(characters, users));
  
  renderSelectList(users, "last_name"); ///???? why is it working, even though not writing "name"??
}

getDataFromApi(URL, rickAndMortyApi);