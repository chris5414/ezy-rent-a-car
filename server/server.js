require("dotenv").config();

const express = require("express");
const connectDB = require("./db/db");
const auth = require("./router/auth");
const users = require("./router/users");
const cars = require("./router/cars");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

connectDB(process.env.MONGODB_URI);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", auth);
app.use("/users", users);
app.use("/cars", cars);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 400;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5001, () => {
  console.log("Express connected");
});
