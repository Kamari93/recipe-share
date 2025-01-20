const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/auth");
const recipeRouter = require("./Routes/reciper");
require("dotenv").config(); // Load .env variables

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", userRouter); // use user router
app.use("/recipe", recipeRouter);

// connect to db
mongoose.connect(process.env.MONGO_URL);

// routes

// Start app
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
