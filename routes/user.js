const express = require("express");
const { signup, signin, signout } = require("../controller/user");
const router = express.Router();
const { check } = require("express-validator");

const validateSignUp = [
  check("name", "Name is too short").isLength({ min: 3 }),
  check("email", "Email is invalid").isEmail(),
  check("password", "Password is too short").isLength({ min: 6 }),
];
const validateSignIn = [check("email", "Email is invalid").isEmail()];

// router.get('/', );
router.post("/signup", validateSignUp, signup);
router.post("/signin", validateSignIn, signin);
router.get("/signout", signout);

module.exports = router;
