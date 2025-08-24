const display = document.querySelector(".calculator-display");
const buttonGrid = document.querySelector(".button-grid");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalBtn = document.querySelector(".equals")
const clearEntryButton = document.querySelector(".action:nth-child(2)");
const decimalButton = document.querySelector(".number:last-child");
let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0){
    return "nope!";
  }
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return add(a, b);
    case '-': 
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '÷': 
      return divide(a, b);   
    default:
      break;
  }
}


function updateDisplay() {
  display.textContent = displayValue;
}

updateDisplay()

function inputNumber(number) {
    // If the decimal button is clicked and the display already has a decimal, do nothing.
    if (number === '.' && displayValue.includes('.')) {
        return;
    }

    if (waitingForSecondOperand === true) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' && number !== '.' ? number : displayValue + number;
    }
}

numberButtons.forEach(button =>{
  button.addEventListener("click", () =>{
    inputNumber(button.textContent)
    updateDisplay();
  })
})

function resetCalculator() {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

clearButton.addEventListener('click', () => {
  resetCalculator();
  updateDisplay(); 
});

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue)

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator){
    const result = operate(operator, firstOperand, inputValue);

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = result;
    updateDisplay();
  }
  waitingForSecondOperand = true;
  operator = nextOperator;
}

operatorButtons.forEach(button => {
  button.addEventListener("click", ()=>{
    handleOperator(button.textContent);
  })
})

function handleEquals() {
  const inputValue = parseFloat(displayValue);
   
   if (firstOperand === null || operator === null) {
    return; 
  }
  const result = operate(operator, firstOperand, inputValue);
  displayValue = `${parseFloat(result.toFixed(7))}`;
    
  firstOperand = null; 
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
  
}

equalBtn.addEventListener("click", () =>{
  handleEquals();
})

function clearEntry() {
    displayValue = '0';
}

clearEntryButton.addEventListener('click', () => {
    clearEntry();
    updateDisplay();
});