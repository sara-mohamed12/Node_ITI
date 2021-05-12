const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const Auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization").replace("Bearer ", "");
    let decoded = jwt.verify(token, "thisissosecret");
    let user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    return res.status(403).send("You need to login");
  }
};

module.exports = Auth;
