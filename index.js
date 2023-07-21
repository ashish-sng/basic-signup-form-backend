const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const { register } = require("./controllers/auth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.post("/register", register);

app.listen(5000, () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      console.log("Server is running on port 5000");
    })
    .catch((error) => {
      console.log(error);
    });
});
