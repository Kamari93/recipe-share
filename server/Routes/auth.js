const express = require("express");
const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load .env variables

const router = express.Router(); // create router

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashPassword });
  await newUser.save();
  return res.json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "Wrong credentials" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  return res.json({
    message: "Login successful",
    id: user._id,
    username: user.username,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout successful" });
});

module.exports = router;
