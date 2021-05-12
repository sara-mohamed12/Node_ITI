const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Post = require("./PostModel");

debugger;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, min: 3, max: 15 },
  age: { type: Number, min: 13 },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

UserSchema.methods.toJSON = function () {
  console.log("HERE");
  let userObject = this.toObject();
  console.log("HERE");
  delete userObject.tokens;
  delete userObject.password;
  console.log("HERE");
  return userObject;
};

UserSchema.methods.generateJWT = async function generateJWT() {
  let token = jwt.sign({ _id: this._id.toString() }, "thisissosecret");
  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

UserSchema.statics.user_login = async function user_login({
  username,
  password,
}) {
  let user = await this.findOne({ username });
  if (!user) throw new Error("Wrong Credentials");

  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Wrong Credentials");

  return user;
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.SALTROUNDS)
    );

  next();
});

UserSchema.pre("remove", async function (next) {
  await Post.remove({ UserId: this._id });
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
