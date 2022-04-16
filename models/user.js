const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 32, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    encry_password: { type: String, required: true },
    salt: String,
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.secured_password(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPass) {
    return this.secured_password(plainPass) === this.encry_password;
  },

  secured_password: function (plainPass) {
    if (!plainPass) return "";
    try {
      return require("crypto")
        .createHmac("sha256", this.salt)
        .update(plainPass)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
