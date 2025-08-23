const display = document.querySelector(".calculator-display");
const buttonGrid = document.querySelector(".button-grid");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelectorAll(".clear");

let displayValue = 0;
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  display.textContent = displayValue;
}

updateDisplay(0)