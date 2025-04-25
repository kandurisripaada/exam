const express = require("express");

const app = express();
app.use(express.json());
const port = 3000;

const users = [
  { name: "sripaada", id: 1 },
  { name: "bunny", id: 2 },
];

const products = [
  { name: "keyboard", id: 1 },
  { name: "laptop", id: 2 },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/products/:id", (req, res) => {
  const prod = products.find((p) => p.id === parseInt(req.params.id));
  if (prod) res.json(prod);
  else res.status(400).send("product not found");
});

app.post("/products", (req, res) => {
  const { name } = req.body;
  const prod = { name, id: products.length + 1 };
  products.push(prod);
  res.status(201).json(prod);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return res.status(404).send("Product not found");
  }

  product.name = name || product.name;
  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const index = products.findIndex((p) => p.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send("Product not found");
  }

  products.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log("server is runnning in port 3000");
});
