//const axios = require("axios");
// import axios from "axios";
const URL = "https://reqres.in/api/users?page=1";
const rickAndMortyApi = "https://rickandmortyapi.com/api/character";

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

  function reorderList(list) {
    getUsersStartingWithVowel({listToRender:list, isVowelFilterActive : true});
    orderAlphabetically({listToRender:list, isAlphabetFilterActive : true});getUsersShorterThanFiveLetters({listToRender:list, isLengthFilterActive : true});
  
  const select = document.getElementById("entries");
  const topUser = list.find((listItem) => listItem.name === select.value);
  const filteredList = list.filter((item) => item.name !== select.value);


  console.log("topUser", topUser);
  console.log("filteredList", filteredList);
 
  return renderList({listToRender: topUser? [topUser].concat(filteredList) : list, bodyId: isUserListVisible()? "user-list" : "character-list"});
}

function renderList({listToRender, bodyId}) {
  const tbody = document.getElementById(bodyId);
  console.log("bodyId", bodyId);
  tbody.innerHTML = "";

  let filteredListToRender = [].concat(listToRender); // you make a copy first
  // console.log("filters", filterVowel, filterAlphabet, filterLength);
  console.log("filteredListToRender", filteredListToRender);

  if (isVowelFilterActive()) {
    filteredListToRender = filteredListToRender.filter((listItem) =>
      /^[aeiouy]/i.test(listItem.name)
    );
  }

  if (isAlphabetFilterActive()) {
    filteredListToRender = filteredListToRender.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (isLengthFilterActive()) {
    filteredListToRender = filteredListToRender.filter(
      (listItem) => listItem?.name?.length <= 4
    );
  }

  filteredListToRender.map((listItem) => {
    let individual = document.createElement("tr");
    let lastname = document.createElement("td");
    let firstname = document.createElement("td");
    let infoOnIndividual = document.createElement("td");
    let imageContainer = document.createElement("td");
    let div = document.createElement("div");

    let img = new Image(); // It is functionally equivalent to document.createElement('img').
    img.src = listItem.image;
    img.alt = "Photo or image of individuals";

    tbody.appendChild(individual);
    individual.appendChild(lastname);
    individual.appendChild(firstname);
    individual.appendChild(infoOnIndividual);
    individual.appendChild(imageContainer);
    lastname.innerHTML = listItem.name;
    firstname.innerHTML = listItem.first_name;
    infoOnIndividual.innerHTML = listItem.contact;
    imageContainer.appendChild(div);
    div.appendChild(img);

    individual.className = "individual";
    lastname.className = "lastname";
    firstname.className = "firstname";
    infoOnIndividual.className = "info-on-individual";
    imageContainer.className = "image-container";
    div.className = "styling-image";
  });
}
  
function isUserListVisible() {
  const table = document.getElementById("teamTable");
  return table.style.display !== "none";
}

function getUsersStartingWithVowel({listToRender, isVowelFilterActive}) {
  const vowelBtn = document.getElementById("btn-vowel");                   
  // console.log("isVowelFilterActive", isVowelFilterActive());
  if (!isVowelFilterActive) {
    vowelBtn.innerHTML = "Show all";
    vowelBtn.style.backgroundColor = "#672634";
  } else {
    vowelBtn.innerHTML = "Names starting with a vowel";
    vowelBtn.style.backgroundColor = "#874A57";
  }
  // console.log("isVowelFilterActiveAfter", isVowelFilterActive());
  renderList({
    listToRender:listToRender,
    bodyId: isUserListVisible()? "user-list" : "character-list"
  });
}

function orderAlphabetically({listToRender, isAlphabetFilterActive }) {
  const alphabetBtn = document.getElementById("btn-alphabet");
  if (!isAlphabetFilterActive) {
    alphabetBtn.innerHTML = "Regular List";
    alphabetBtn.style.backgroundColor = "#672634";
  } else {
    alphabetBtn.innerHTML = "Put in alphabetical order";
    alphabetBtn.style.backgroundColor = "#874A57";
  }
  renderList({
    listToRender:listToRender,
    bodyId: isUserListVisible()? "user-list" : "character-list"
  });
}

function getUsersShorterThanFiveLetters({listToRender, isLengthFilterActive }) {
  const lengthBtn = document.getElementById("btn-length");
  if (!isLengthFilterActive) {
    lengthBtn.innerHTML = "All The Entries";
    lengthBtn.style.backgroundColor = "#672634";
  } else {
    lengthBtn.innerHTML = "Names of five letters or less";
    lengthBtn.style.backgroundColor = "#874A57";
  }
  renderList({
    listToRender:listToRender,
    bodyId: isUserListVisible()? "user-list" : "character-list"
  });
}

function replaceDataInTable({users, characters}) {
const replaceBtn = document.getElementById("btn-replace");
  if (!isReplaceFilterActive()) {
    replaceBtn.innerHTML = "Previous Data";
    replaceBtn.style.backgroundColor = "#672634";
    document.getElementById("teamTable").style.display = "none";
    document.getElementById("rickTable").style.display = null; // would be "table" otherwise, but null is safer, prevents mistakes. Null makes it go back to its initial state ----> need to review this, not sure I'm getting it
    renderSelectList(characters);
  } else {
    replaceBtn.innerHTML = "Wubba lubba dub dub";
    replaceBtn.style.backgroundColor = "#874A57";
    document.getElementById("teamTable").style.display = null;
    document.getElementById("rickTable").style.display = "none";
    renderSelectList(users);
  }
}

async function getDataFromApi(URL, rickAndMortyApi) {
  const responseUser = await axios.get(URL); 
  const responseRick = await axios.get(rickAndMortyApi);

  let resultUser = responseUser.data;
  let resultRick = responseRick.data;
  console.log(resultUser);
  console.log(resultRick);

  let tbody = document.createElement("tbody");
  tbody.setAttribute("id", "user-list");
  let tbodyRick = document.createElement("tbody");
  tbodyRick.setAttribute("id", "character-list");
  let tfoot = document.getElementById("tfoot");

  tfoot.parentNode.insertBefore(tbody, tfoot); // inserts tbody before tfoot in table
  document.getElementById("rickTable").appendChild(tbodyRick);
  
  let users = resultUser.data.map((user) => ({...user, name: user.last_name, image: user.avatar, contact: user.email}) ); // ...user  (spread)
  console.log("users", users);
  let characters = resultRick.results.map((character) => {
    const splittedName = character.name.split(' ');
    return ({...character, first_name: splittedName[0], name: splittedName[splittedName.length - 1], contact: character.location.name 
  })});
  console.log("characters", characters);

  //executed on first load
  renderList({listToRender:users, bodyId: "user-list"});
  renderList({listToRender:characters, bodyId: "character-list"});

  const vowelBtn = document.getElementById("btn-vowel");
  const alphabetBtn = document.getElementById("btn-alphabet");
  const lengthBtn = document.getElementById("btn-length");
  const replaceBtn = document.getElementById("btn-replace");
  const select =  document.getElementById("entries");

  // select.addEventListener("change", reorderList); // other way= of writing the function
  select.addEventListener("change", () => reorderList(isUserListVisible()? users : characters, isUserListVisible()? "last_name" : "name"));

  vowelBtn.addEventListener("click", () => getUsersStartingWithVowel({listToRender:isUserListVisible()? users : characters, renderList:renderList,isVowelFilterActive:isVowelFilterActive()}));

  alphabetBtn.addEventListener("click", () => orderAlphabetically({listToRender:isUserListVisible()? users : characters, renderList:renderList, isAlphabetFilterActive:isAlphabetFilterActive()}));

  lengthBtn.addEventListener("click", () => getUsersShorterThanFiveLetters({listToRender:isUserListVisible()? users : characters, renderList:renderList, isLengthFilterActive:isLengthFilterActive()}));

  replaceBtn.addEventListener("click", () => replaceDataInTable({characters, users}));
  
  renderSelectList(users); ///???? why is it working, even though not writing "name"??
}

getDataFromApi(URL, rickAndMortyApi);