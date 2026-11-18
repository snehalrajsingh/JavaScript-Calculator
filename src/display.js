// MEMBER 3: Display and input-state module.
// This module controls the calculator screen and the number being entered.

const displayElement = document.getElementById("display");
let currentInput = "0";
let shouldStartNewInput = false;

function render() {
  displayElement.value = currentInput;
}

export function getInput() {
  return Number(currentInput);
}

export function getInputText() {
  return currentInput;
}

export function setInput(value) {
  currentInput = String(value);
  shouldStartNewInput = true;
  render();
}

export function appendDigit(digit) {
  if (shouldStartNewInput) {
    currentInput = digit;
    shouldStartNewInput = false;
  } else if (currentInput === "0") {
    currentInput = digit;
  } else {
    currentInput += digit;
  }
  render();
}

export function appendDecimal() {
  if (shouldStartNewInput) {
    currentInput = "0";
    shouldStartNewInput = false;
  }
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  render();
}

export function clearDisplay() {
  currentInput = "0";
  shouldStartNewInput = false;
  render();
}

export function deleteLast() {
  if (shouldStartNewInput) {
    currentInput = "0";
    shouldStartNewInput = false;
  } else {
    currentInput = currentInput.length > 1
      ? currentInput.slice(0, -1)
      : "0";
    if (currentInput === "-" || currentInput === "") currentInput = "0";
  }
  render();
}
