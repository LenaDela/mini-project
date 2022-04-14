// import 'node-fetch';
const URL = "https://reqres.in/api/users?page=1";

async function getDataFromApi(URL) {
  const response = await fetch(URL); // by default it's GET
  console.log(response)

  let result = await response.json();
  console.log(result)

  let table = document.getElementById("teamTable");
  let tbody = document.createElement("tbody");
  let tfoot = document.getElementById("tfoot");
  table.insertBefore(tbody, tfoot); // inserts tbody before tfoot in table
  let users = result.data;
  console.log(users)
  
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
  } )

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

const quotesApi = "https://zenquotes.io/api/random";
async function getQuoteApi(quotesApi) {
  const response = await fetch(quotesApi, {
    mode: 'no-cors'
  }); // by default it's GET
  console.log(response)

  let result = await response.json();
  console.log(result)
}
getQuoteApi(quotesApi);