const express = require("express");
const path = require("path");

const app = express();

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/result", express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res) => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const isDayTime = (hour >= 6 && hour < 16) || (hour === 16 && minute === 0);
  const cssFile = isDayTime ? "day" : "night";
  res.render("index", { cssFile });
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
