const express = require("express");
const app = express();

app.use(express.json());
const port = 3000;

const users = [
  { id: 1, name: "sripaada", email: "sripaada@gmail.com" },
  { id: 2, name: "bunny", email: "bunny@gmail.com" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) res.status(400).send("no user found");

  res.json(user);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) res.status(400).send("email and nma e requires");

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.send(newUser);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) res.status(400).send("user not found");

  const { name, email } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) res.status(400).send("user not found");

  users.splice(index, 1);
  res.json(users);
});

app.listen(port, () => {
  console.log("server started at port 3000");
});
