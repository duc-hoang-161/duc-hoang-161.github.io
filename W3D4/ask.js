const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports.ask = function ask(question, callback, close = false) {
  readline.question(question, function (input) {
    callback(input);
    if (close) readline.close();
  });
};

module.exports.close = () => readline.close();
