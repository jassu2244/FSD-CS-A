const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const port = process.env.PORT || 3001;
app.use(express.json());
const users = [{ id: "1", uname: "admin", password: "manager" }];
app.get("/users", (req, res) => {
  try {
    res.status(200).json({ message: "user find successfully", users });
  } catch (err) {
    res.status(500).json({ message: "failed to find user", Error: err.message });
  }
});
app.get("/user/:id", (req, res) => {
  try {
    const id = req.params.id;
    const user = users.find((u) => u.id == id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user find successfully", user });
  } catch (err) {
    res.status(500).json({ message: "failed to find user", Error: err.message });
  }
});
app.post("/user/add", (req, res) => {
  try {
    const newUser = {
      id: Date.now(),
      ...req.body,
    };
    users.push(newUser);
    res.status(201).json({ message: "user created successfully", newUser });
  } catch (err) {
    res.status(500).json({ message: "failed to create user", Error: err.message });
  }
});
app.put("/user/edit/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = users.findIndex((u) => u.id == id);
    if (index == -1) {
      return res.status(404).json({ message: "user not found" });
    }
    users[index] = {
      ...users[index],
      ...req.body,
    };
    res.status(200).json({ message: "user updated successfully", ...req.body });
  } catch (err) {
    res.status(500).json({ message: "failed to update user", Error: err.message });
  }
});
app.delete("/user/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = users.findIndex((u) => u.id == id);
    if (index == -1) {
      return res.status(404).json({ message: "user not found" });
    }
    users.splice(index, 1);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "failed to delete user", Error: err.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
