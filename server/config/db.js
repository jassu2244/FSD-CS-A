const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.DB_URL;

function DBconnect() {
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected Successfully");
    })
    .catch((err) => {
      console.error("Error : ", err.message);
    });
}

module.exports = DBconnect;
