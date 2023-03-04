require("dotenv").config();
const express = require("express");
const cors = require('cors')
const connectToDB = require("./config/db");
const userRoutes = require("./routes/user");
const app = express();
app.use(cors())

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();
app.use("/", userRoutes);

module.exports = app;
