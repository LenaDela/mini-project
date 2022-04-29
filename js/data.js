const URL = "https://reqres.in/api/users?page=1";

async function getDataFromApi(URL) {
  const response = await fetch(URL); // by default it's GET
  console.log(response);

  let result = await response.json();
  console.log(result);

  let tbody = document.createElement("tbody");
  let tfoot = document.getElementById("tfoot");
  let divList = document.createElement("div");
  divList.setAttribute("id", "user-list");

  tfoot.parentNode.insertBefore(tbody, tfoot); // inserts tbody before tfoot in table

  let users = result.data;
  console.log(users);

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
  renderUserList(false);

  const vowelBtn = document.getElementById("btn-vowel");
  const alphabetBtn = document.getElementById("btn-alphabet");
  const lengthBtn = document.getElementById("btn-five-letters");

  const isVowelFilterActive = () =>
    vowelBtn.innerHTML !== "Names starting with a vowel";

  const isAlphabetFilterActive = () =>
    alphabetBtn.innerHTML !== "Put in alphabetical order";
  
  const isLengthFilterActive = () =>
    lengthBtn.innerHTML !== "Names of five letters or less";

  vowelBtn.addEventListener("click", getUsersStartingWithVowel);
  function getUsersStartingWithVowel() {
    if (!isVowelFilterActive()) {
      vowelBtn.innerHTML = "Show all";
      vowelBtn.style.backgroundColor = "#672634";
    } else {
      vowelBtn.innerHTML = "Names starting with a vowel";
      vowelBtn.style.backgroundColor = "#874A57";
    }
    renderUserList(
      isVowelFilterActive(),
      isAlphabetFilterActive(),
      isLengthFilterActive()
    );
  }

  alphabetBtn.addEventListener("click", orderAlphabetically);
  function orderAlphabetically() {
    if (!isAlphabetFilterActive()) {
      alphabetBtn.innerHTML = "Regular List";
      alphabetBtn.style.backgroundColor = "#672634";
    }else {
      alphabetBtn.innerHTML = "Put in alphabetical order";
      alphabetBtn.style.backgroundColor = "#874A57";
    }
    renderUserList(
      isVowelFilterActive(),
      isAlphabetFilterActive(),
      isLengthFilterActive()
    );
  }
  lengthBtn.addEventListener("click", getUsersShorterThanFiveLetters);
  function getUsersShorterThanFiveLetters() {
    if (!isLengthFilterActive()) {
      lengthBtn.innerHTML = "All Pokemon";
      lengthBtn.style.backgroundColor = "#672634";
    } else {
      lengthBtn.innerHTML = "Names of five letters or less";
      lengthBtn.style.backgroundColor = "#874A57";
    }
    renderUserList(
      isVowelFilterActive(),
      isAlphabetFilterActive(),
      isLengthFilterActive()
    );
  }
}

getDataFromApi(URL);
