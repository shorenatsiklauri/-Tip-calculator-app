const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.getElementById("custom");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let tipValue = e.target.innerText;
    tipValue = tipValue.substr(0, tipValue.length - 1);

    if (billAmount.value === "") return;
    if (numberOfPeople.value === "") numberOfPeople.value = 1;

    calculateTip(
      parseFloat(billAmount.value),
      parseInt(tipValue),
      parseInt(numberOfPeople.value)
    );
  });
});

customTipPercentage.addEventListener("blur", (e) => {
  if (billAmount.value === "") {
    resetEverything();
    return;
  }

  if (numberOfPeople.value === "") numberOfPeople.value = 1;

  calculateTip(
    parseFloat(billAmount.value),
    parseFloat(e.target.value),
    parseInt(numberOfPeople.value)
  );
});

function calculateTip(billAmount, customTipPercentage, numberOfPeople) {
  let tipAmount = (billAmount * (customTipPercentage / 100)) / numberOfPeople;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
  totalAmount = totalAmount.toFixed(2);

  billTipAmount.innerHTML = `$${tip}`;
  billTotalPerPerson.innerHTML = `$${totalAmount}`;
}

resetButton.addEventListener("click", resetEverything);

function resetEverything() {
  billTipAmount.innerHTML = "0.00";
  billTotalPerPerson.innerHTML = "0.00";
  billAmount.value = "";
  numberOfPeople.value = "";
  customTipPercentage.value = "";
}
