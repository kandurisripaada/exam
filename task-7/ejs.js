const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get("/", (req, res) => {
  res.render("users", { users });
});

app.post("/users", (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.redirect("/");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
