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
let justCalculated = false;


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
    if (number === '.' && displayValue.includes('.')) {
        return; 
    }

    if (waitingForSecondOperand === true || justCalculated) {
        displayValue = number;   
        waitingForSecondOperand = false;
        justCalculated = false; 
    } else {
        displayValue = displayValue === '0' && number !== '.' 
            ? number 
            : displayValue + number;
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
  justCalculated = false; 
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

  justCalculated = true; // 🔥 activamos la bandera
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

function backspace() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1); // elimina el último carácter
  } else {
    displayValue = '0'; // si queda un solo dígito, reinicia a 0
  }
  updateDisplay();
}

document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Números
  if (!isNaN(key)) {
    inputNumber(key);
    updateDisplay();
  }

  // Punto decimal
  if (key === ".") {
    inputNumber(".");
    updateDisplay();
  }

  // Operadores
  if (["+", "-", "*", "/"].includes(key)) {
    const op = key === "*" ? "×" : key === "/" ? "÷" : key;
    handleOperator(op);
  }

  // Igual (= o Enter)
  if (key === "=" || key === "Enter") {
    handleEquals();
  }

  // Backspace del teclado
  if (key === "Backspace") {
    backspace();
  }

  // Escape = reset
  if (key === "Escape") {
    resetCalculator();
    updateDisplay();
  }
});
