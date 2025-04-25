const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const User = require("./user.js"); // Assuming user.js exports a User model

mongoose
  .connect("mongodb://localhost:27017/sripaada")
  .then(() => console.log("DB connected"))
  .catch((error) => {
    console.log(error);
  });

// Get all users
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Get a user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("User not found");

    res.json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).send("Enter correct details");

    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) return res.status(400).send("User not found");

    res.json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(400).send("User not found");

    res.json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
