"use strict";
/* Write functions to: 
   Return the display of the string for a random person,
   Create a node and display the string that represents the person.
   Asynchronously handle the event.
   Add an event listener for the buttons.
*/

// original way
/* function createStringPerson(person) {
  
  From randomuser.me/api/
  gender, name, location, email, login, dob, registered,
  phone, cell, id, picture, nat are some options.



  const image = document.getElementById(${person.picture.thumbnail})

  return `
  ${person.name.first}
   ${person.name.last}

   call ${person.cell}
   or write ${person.email}`;}
  */

function displayStringPerson(person) {
  // creates a new table row
  // if using ol, ul replace tr with li

  // insert table id here
  const table = document.getElementById("data");
  const row = table.insertRow(-1); // new row at end of table

  const photo = row.insertCell(0);
  const firstname = row.insertCell(1);
  const lastname = row.insertCell(2);
  const cell = row.insertCell(3);
  const email = row.insertCell(4);

  firstname.innerHTML = `${person.name.first}`;
  lastname.innerHTML = `${person.name.last}`;
  cell.innerHTML = `${person.cell}`;
  email.innerHTML = `${person.email}`;

  const img = document.createElement("img");
  img.src = `${person.picture.thumbnail}`;
  photo.appendChild(img);

  /*original way that kept all info in one cell per row
  const tr = document.createElement("tr");
  tr.textContent = createStringPerson(person);
  tr.setAttribute("class", "person");

  const xhr_data = document.getElementById("data");
  xhr_data.appendChild(tr);        */
}

async function getData(event) {
  // we don't want to submit form
  event.preventDefault();
  const targetID = event.target.getAttribute("id");

  const url =
    targetID === "fromBrowser"
      ? "https://randomuser.me/api/"
      : "/random-person";

  // statements to be executed
  try {
    // fetch() starts a request and returns a promise
    // await simplifies work with promises
    const response = await fetch(url);
    // when request completes, promise is resolved with response
    const data = await response.json();

    // 200 OK
    if (response.status === 200) {
      displayStringPerson(data.results[0]);
    }
    // executes if exception is thrown into try
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const linkFromBrowser = document.getElementById("fromBrowser");
  linkFromBrowser.addEventListener("click", getData);

  const linkFromServer = document.getElementById("fromServer");
  linkFromServer.addEventListener("click", getData);
});
