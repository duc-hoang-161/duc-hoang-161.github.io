const { ask } = require("./ask");

ask("What is your name? ", (name) => {
  console.log(`Welcome ${name}`);
  ask(
    "How old are you? ",
    (a) => {
      const age = parseInt(a);
      const msg =
        age > 16
          ? "You’re allowed to get a drivers license in Iowa"
          : "You’re not allowed to drive in Iowa";
      console.log(msg);
    },
    true
  );
});
