const express = require("express");

const app = express();

app.use("/result", express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`
    <form action="/result" method="post">
    <label for="name">Name</label>
    <input id="name" name="name" type="text">
    <label for="age">Age</label>
    <input id="age" name="age" type="text">
    <input type="submit">
    </form>
  `);
});

app.post("/result", (req, res) => {
  const { name, age } = req.body;
  res.send(`Welcome ${name || "person"}, your age: ${age || "unknown"}`);
});

app.listen(3000, () => console.log("Server is started"));
