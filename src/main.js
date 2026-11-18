// MEMBER 4: Integration and event handling module.
// This file connects the HTML buttons to the arithmetic, advanced and display modules.

import { calculate } from "./arithmetic.js";
import {
  percentage,
  square,
  squareRoot,
  changeSign
} from "./advanced.js";
import {
  getInput,
  setInput,
  appendDigit,
  appendDecimal,
  clearDisplay,
  deleteLast
} from "./display.js";

const messageElement = document.getElementById("message");

let storedValue = null;
let selectedOperator = null;
let startNewNumber = false;

function showError(message) {
  messageElement.textContent = message;
}

function clearError() {
  messageElement.textContent = "";
}

function formatResult(value) {
  if (!Number.isFinite(value)) {
    throw new Error("Result is not a finite number");
  }
  // Avoid long floating-point tails while keeping useful precision.
  return Number.parseFloat(value.toPrecision(12)).toString();
}

function chooseOperator(operator) {
  clearError();
  const currentValue = getInput();

  if (storedValue !== null && selectedOperator && !startNewNumber) {
    const result = calculate(storedValue, selectedOperator, currentValue);
    storedValue = result;
    setInput(formatResult(result));
  } else {
    storedValue = currentValue;
  }

  selectedOperator = operator;
  startNewNumber = true;
}

function calculateResult() {
  if (storedValue === null || selectedOperator === null) return;

  try {
    const result = calculate(storedValue, selectedOperator, getInput());
    setInput(formatResult(result));
    storedValue = null;
    selectedOperator = null;
    startNewNumber = true;
    clearError();
  } catch (error) {
    showError(error.message);
  }
}

function runUnaryAction(action) {
  try {
    const value = getInput();
    let result;

    switch (action) {
      case "percent": result = percentage(value); break;
      case "square": result = square(value); break;
      case "sqrt": result = squareRoot(value); break;
      case "sign": result = changeSign(value); break;
      default: return;
    }

    setInput(formatResult(result));
    clearError();
  } catch (error) {
    showError(error.message);
  }
}

function handleAction(action) {
  switch (action) {
    case "clear":
      clearDisplay();
      storedValue = null;
      selectedOperator = null;
      startNewNumber = false;
      clearError();
      break;
    case "backspace":
      deleteLast();
      clearError();
      break;
    case "decimal":
      appendDecimal();
      clearError();
      break;
    case "equals":
      calculateResult();
      break;
    default:
      runUnaryAction(action);
  }
}

document.querySelector(".button-grid").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.value !== undefined) {
    appendDigit(button.dataset.value);
    clearError();
    return;
  }

  if (button.dataset.operator) {
    chooseOperator(button.dataset.operator);
    return;
  }

  if (button.dataset.action) {
    handleAction(button.dataset.action);
  }
});

// Keyboard support: numbers, decimal point, + - * /, Enter, Backspace and Escape.
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    appendDigit(key);
    clearError();
  } else if (key === ".") {
    appendDecimal();
  } else if (["+", "-", "*", "/"].includes(key)) {
    chooseOperator(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    handleAction("clear");
  }
});
