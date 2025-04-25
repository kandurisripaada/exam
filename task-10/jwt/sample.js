const express = require("express");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const User = require("./model/user.js");
const verifyToken = require("./middleware/auth.js");

mongoose
  .connect("mongodb://localhost:27017/sripaada")
  .then(() => console.log("DB connected"))
  .catch((error) => {
    console.log(error);
  });

// Create a new user
app.post("/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).send("Enter correct details");

    const u = await User.findOne({ email });
    if (u) return res.status(400).send("email already in use");

    const hashpw = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashpw });

    const token = jwt.sign({ id: user._id }, "sripaada", { expiresIn: "1d" });
    res.json({ token: token });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Enter correct details");

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("user does not exist regiester");

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) return res.status(400).send("wrong password");

    const token = jwt.sign({ id: user._id }, "sripaada", { expiresIn: "1d" });
    res.json({ token: token });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/protected", verifyToken, async (req, res) => {
  res.send("this is a protected endpoint");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
