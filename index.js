import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-6336c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

onValue(shoppingListInDb, function (snapshot) {

  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearItemList();

    for (const element of itemsArray) {
      let currentItem = element;
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here... yet"
  }
});

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(shoppingListInDb, inputValue);
  clearInputFieldEl();
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearItemList() {
  shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let locationOfItem = ref(database, `shoppingList/${itemID}`)
    remove(locationOfItem);
  })
  shoppingListEl.append(newEl);
}