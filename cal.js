const displayResult = document.querySelector("#result");
const buttons = document.querySelectorAll(".button");
let currentInput = "";
let currentOperator = "";
let previousInput = "";
let calculationCompleted = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const operator = button.dataset.operator;

    if (button.id === "clear") {
      clearCalculator();
    } else if (button.id === "delete") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    } else if (button.id === "percent") {
      calculatePercentage();
    } else if (calculationCompleted && !["clear", "delete", "percent"].includes(button.id)) {
      calculationCompleted = false;
      currentInput = "";
    }

    if (value !== undefined) {
      currentInput += value;
      updateDisplay();
    } else if (operator !== undefined) {
      if (currentInput !== "") {
        if (previousInput === "") {
          previousInput = currentInput;
          currentInput = "";
          currentOperator = operator;
        } else {
          calculateAndUpdate(operator);
        }
      } else if (previousInput !== "") {
        currentOperator = operator; // Allow operator to be changed for existing result
      }
    } else if (button.id === "equals") {
      if (currentOperator !== "") {
        calculateAndUpdate();
        calculationCompleted = true;
      }
    }
  });
});

function calculateAndUpdate(newOperator = "") {
  if (currentOperator === "" || currentInput === "") {
    return;
  }
  previousInput = operate(previousInput, currentInput, currentOperator);
  currentInput = "";
  currentOperator = newOperator;
  updateDisplay();
}

function updateDisplay() {
  displayResult.textContent = previousInput + (currentOperator ? " " + currentOperator + " " : "") + currentInput || "0";
}

function clearCalculator() {
  currentInput = "";
  currentOperator = "";
  previousInput = "";
  calculationCompleted = false;
  updateDisplay();
}

function calculatePercentage() {
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

function operate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operator) {
    case "+":
      return (num1 + num2).toString();
    case "-":
      return (num1 - num2).toString();
    case "*":
      return (num1 * num2).toString();
    case "/":
      if (num2 !== 0) {
        return (num1 / num2).toString();
      } else {
        return "Error";
      }
    default:
      return "Error";
  }
}
