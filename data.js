// import 'node-fetch';
const URL = "https://reqres.in/api/users?page=1";

async function getDataFromApi(URL) {
  const response = await window.fetch(URL);

  let result = await response.json();

  let table = document.getElementById("teamTable");
  let tfoot = document.getElementById("tfoot");
  let tbody = document.createElement("tbody");
  table.insertBefore(tbody, tfoot);

  let array = result.data;
  
  array.map((item) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let div = document.createElement("div");
    
    let img = new Image();
    img.src = item.avatar;
    
    tbody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td.innerHTML = item.last_name;
    td2.innerHTML = item.first_name;
    td3.innerHTML = item.email;
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

console.log("Hello");
