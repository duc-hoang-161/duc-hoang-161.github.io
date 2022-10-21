const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const { name, age } = req.query;
  res.send(`Welcome ${name || "person"}, your age: ${age || "unknown"}`);
});

app.listen(3000, () => console.log("Server is started"));
