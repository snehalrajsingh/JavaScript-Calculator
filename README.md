# JavaScript Calculator — 4 Member Team Project

## Project files
- `index.html` — calculator page and buttons
- `style.css` — calculator styling
- `src/arithmetic.js` — basic arithmetic (Member 1)
- `src/advanced.js` — advanced operations (Member 2)
- `src/display.js` — display and number-entry behavior (Member 3)
- `src/main.js` — event handling and integration (Member 4)

## How to run
Because this project uses JavaScript ES modules, open the folder in VS Code and run it with the Live Server extension. Open `index.html` using **Open with Live Server**. Do not open the HTML file directly with `file://`.

## Team contract
Do not rename exported functions or change their parameters without informing the team. If you change an interface, tell the integration owner and update the imports in `src/main.js`.

## Git workflow
Each person should work on their assigned branch and assigned file(s), commit their changes, push the branch, and create a Pull Request into `main`. The integration owner should merge only after checking the changes.

## Suggested tests
- `8 + 2 = 10`
- `9 - 4 = 5`
- `6 × 7 = 42`
- `8 ÷ 2 = 4`
- `8 ÷ 0` shows an error
- `5`, then `x²` gives `25`
- `25`, then `√` gives `5`
- `50`, then `%` gives `0.5`
- Decimal input: `1.5 + 2 = 3.5`
- Keyboard: type `12+3`, press Enter, expect `15`
