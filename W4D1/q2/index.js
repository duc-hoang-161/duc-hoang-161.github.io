const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(
  session({
    secret: "keyboard cat",
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/result", express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const isDayTime = (hour >= 6 && hour < 16) || (hour === 16 && minute === 0);
  const cssFile = isDayTime ? "day" : "night";
  res.render("index", { cssFile });
});

app.post("/result", (req, res) => {
  Object.assign(req.session, req.body);
  res.redirect("/output");
});

app.get("/output", (req, res) => {
  const { name, age } = req.session;
  res.send(`Welcome ${name || "person"}, your age: ${age || "unknown"}`);
});

app.listen(3000, () => console.log("Server is started"));
