// MEMBER 2: Advanced operations module.
// Keep these exported function names unchanged so main.js can use them.

export function percentage(value) {
  return value / 100;
}

export function square(value) {
  return value * value;
}

export function squareRoot(value) {
  if (value < 0) {
    throw new Error("Cannot find the square root of a negative number");
  }
  return Math.sqrt(value);
}

export function changeSign(value) {
  return value * -1;
}
