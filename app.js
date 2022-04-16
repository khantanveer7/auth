const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const CookieParser = require("cookie-parser");
const Cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// DB Connection
const url = process.env.DATABASE_URL;
// console.log(url);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected 🚀");
  })
  .catch((err) => {
    console.log(err);
    console.log("DB Connection Error");
  });

// Middlewares
app.use(bodyParser.json());
app.use(CookieParser());
app.use(Cors());

// all routes imports
const userRoutes = require("./routes/user");
// Routes
app.use("/api", userRoutes);
// app.use("/api", userRoutes);

const port = process.env.PORT || 8000;
// Server
app.listen(port, () => {
  console.log(`Server started on port localhost:${port}`);
});
