let form = document.getElementById("form");
let description = document.getElementById("description");
let amount = document.getElementById("amount");
const list = document.getElementById("list");

const localStorageTransaction = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransaction : [];

//Add transaction
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (description.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add Text and amount!");
  } else {
    const transaction = {
      description: description.value,
      amount: amount.value,
    };
    transactions.push(transaction);

    //Creeate element
    addTransactionDOM(transaction);

    //update localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  description.value = "";
  amount.value = "";
});

function addTransactionDOM(transaction) {
  const item = document.createElement("li");

  item.innerHTML = `${transaction.description} - ${transaction.amount} <button class='delete-btn' onClick='removeTransaction(${transaction.description})'> X </button>`;
  list.appendChild(item);
}

//Delete Item
function removeTransaction(desc) {
  transactions = transactions.filter((item) => item.description !== desc);
  //update local storage
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Display latest items from localstorage
function diaplayList() {
  list.innerHTML = "";
  transactions.forEach((item) => addTransactionDOM(item));
}
diaplayList();

console.log(list.innerHTML);
