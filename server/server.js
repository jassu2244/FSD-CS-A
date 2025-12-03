const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const DBConnect = require("../server/config/db.js");
const User = require("../server/models/User.js");
dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
DBConnect();
app.use(express.json());
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "user found successfully", users });
  } catch (err) {
    res.status(500).json({ message: "failed to fetch user", Error: err.message });
  }
});

app.get("/user/:email", async (req, res) => {
  try {
    const id = req.params.email;
    const user = await User.findOne({ email: id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user found successfully", user });
  } catch (err) {
    res.status(500).json({ message: "failed to fetch user", Error: err.message });
  }
});

app.post("/add", async (req, res) => {
  try {
    const newUser = { ...req.body };
    const user = new User(newUser);
    await user.save();
    res.status(201).json({ message: "user created successfully", user });
  } catch (err) {
    res.status(500).json({ message: "failed to create user", Error: err.message });
  }
});

app.put("/edit/:email", async (req, res) => {
  try {
    const id = req.params.email;
    const data = { ...req.body };
    const updatedUser = await User.findOneAndUpdate({ email: id }, data);
    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user updated successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ message: "failed to update user", Error: err.message });
  }
});

app.delete("/delete/:email", async (req, res) => {
  try {
    const id = req.params.email;
    const deletedUser = await User.findOneAndDelete({ email: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user deleted successfully", deletedUser });
  } catch (err) {
    res.status(500).json({ message: "failed to delete user", Error: err.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
