const { ask, close } = require("./ask");

async function askNumbers() {
  let asking = true;
  const numbers = [];
  const callback = (input, resolve) => {
    if (input === "stop") {
      asking = false;
      close();
    }
    if (/\d/.test(input)) numbers.push(parseInt(input));
    resolve();
  };
  while (asking) {
    await new Promise((resolve) =>
      ask("Enter a number: ", (input) => callback(input, resolve))
    );
  }
  const sum = numbers.reduce((s, n) => s + n);
  console.log(`The summarize is ${sum}`);
}
askNumbers();
