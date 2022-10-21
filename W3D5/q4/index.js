const express = require("express");
const path = require("path");

const app = express();

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/result", express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const isDayTime = (hour >= 6 && hour < 16) || (hour === 16 && minute === 0);
  const cssFile = isDayTime ? "day" : "night";
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Index</title>
      <link rel="stylesheet" href="css/${cssFile}.css">
    </head>
    <body>
    <form action="/result" method="post">
    <label for="name">Name</label>
    <input id="name" name="name" type="text">
    <label for="age">Age</label>
    <input id="age" name="age" type="text">
    <input type="submit">
    </form>
    </body>
    </html>
  `);
});

app.post("/result", (req, res) => {
  const { name, age } = req.body;
  res.redirect(`/output?name=${name}&age=${age}`);
});

app.get("/output", (req, res) => {
  const { name, age } = req.query;
  res.send(`Welcome ${name || "person"}, your age: ${age || "unknown"}`);
});

app.listen(3000, () => console.log("Server is started"));
