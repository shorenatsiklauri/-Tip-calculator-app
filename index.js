const billAmount = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTipPercentage = document.getElementById("custom");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");
let tipValue;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    tipValue = e.target.innerText;
    tipValue = tipValue.substr(0, tipValue.length - 1);

    calculateTip(
      parseFloat(billAmount.value),
      parseFloat(tipValue),
      parseFloat(numberOfPeople.value)
    );

    console.log(
      parseFloat(billAmount.value),
      parseFloat(tipValue),
      parseFloat(numberOfPeople.value)
    );
  });
});

customTipPercentage.addEventListener("input", (e) => {
  if (billAmount.value === "") {
    resetEverything();
    return;
  }
  tipValue = e.target.value;
  calculateTip(
    parseFloat(billAmount.value),
    parseFloat(e.target.value),
    parseInt(numberOfPeople.value)
  );
});

function calculateTip(billAmount, customTipPercentage, numberOfPeople) {
  if (billAmount && customTipPercentage && numberOfPeople) {
    let tipAmount = (billAmount * (customTipPercentage / 100)) / numberOfPeople;
    let tip = Math.floor(tipAmount * 100) / 100;
    tip = tip.toFixed(2);

    let totalAmount =
      (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
    totalAmount = totalAmount.toFixed(2);

    billTipAmount.innerHTML = `$${tip}`;
    billTotalPerPerson.innerHTML = `$${totalAmount}`;
  }
}
numberOfPeople.addEventListener("input", () => {
  calculateTip(
    parseFloat(billAmount.value),
    parseFloat(tipValue),
    parseFloat(numberOfPeople.value)
  );
});

customTipPercentage.addEventListener("input", () => {
  if (customTipPercentage.value <= 0) {
    resetEverything();
  }
});

resetButton.addEventListener("click", resetEverything);

function resetEverything() {
  billTipAmount.innerHTML = "0.00";
  billTotalPerPerson.innerHTML = "0.00";
  billAmount.value = "";
  numberOfPeople.value = "";
  customTipPercentage.value = "";
}
