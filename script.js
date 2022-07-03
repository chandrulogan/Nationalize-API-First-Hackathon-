const section = document.createElement("section");
section.innerHTML = `
<input class="enter-user-name" required placeholder="Enter user name" >
  <button onclick="findCountry()">Find Country</button>
  `;

const info = document.createElement("div");
info.className = "user-list";

document.body.append(section, info);
function findCountry() {
  userName = document.querySelector(".enter-user-name").value;
  getDetails();
  displayCountry();
}

async function getDetails() {
  const data = await fetch("https://api.nationalize.io/?name=" + userName, {
    method: "GET"
  });
  const users = await data.json();
  return users;
}

async function displayCountry() {
  try {
    const users = await getDetails();
    console.log(users);
    var userList = document.querySelector("");
    var countryDetails = users.country;
    let noResults;
    if (countryDetails == []) {
      return noResults;
    }
    userList.innerHTML = `<div class="user-container">
  <h2 class="first-country">First Country: <span style="color:crimson">${countryDetails[0].country_id}</span> ,  Probability: <span style="color:crimson">${countryDetails[0].probability}</span></h2>
  <h2 class="second-country">Second Country: <span style="color:crimson">${countryDetails[1].country_id}</span> , Probability: <span style="color:crimson">${countryDetails[1].probability}</span></h2>
</div>`;
  } catch (noResults) 
   {
    userList.innerHTML = `<p class="errorMsg">Please enter a valid Name</p>`;
    console.log("catched error");
   }
}