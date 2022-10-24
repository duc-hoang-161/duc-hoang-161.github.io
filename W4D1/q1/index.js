const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("my secret here"));

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.render("index", { cookies: req.cookies });
});

app.post("/", (req, res) => {
  res.cookie(req.body.key, req.body.value, { maxAge: 10 * 60 * 60 });
  res.redirect("/");
});

app.listen(3000, () => console.log("Server started"));
