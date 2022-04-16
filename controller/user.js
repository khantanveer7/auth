const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save user in DB",
      });
    }

    return res.json({
      message: "User created successfully",
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with this email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email } = user;
    return res.json({
      token,
      user: { _id, name, email },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  // res.json({
  //   message: "User signout successfully",
  // });
};
