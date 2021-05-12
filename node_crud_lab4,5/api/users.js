const User = require("../models/UserModel");

const home = async (req, res) => {
  let users = await User.find({}, (err, users) => {
    if (err) next(err);
    return res.send(users);
  });
};

const profile = (req, res) => {
  return res.send([{ user: req.user }, { token: req.token }]);
};

const login = async (req, res, next) => {
  try {
    let user = await User.user_login(req.body);
    user.generateJWT();

    return res.send({ user, token });
  } catch (e) {
    next(1);
  }
};

const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    return res.send(req.user);
  } catch (e) {
    next(e);
  }
};

const register = async (req, res, next) => {
  try {
    if (await User.findOne({ username: req.body.username }))
      return res.send("User already exists");

    let user = await User.create({ ...req.body });
    user.generateJWT();
    return res.send(user);
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  // findByIdAndUpdate updates the db directly and by passes mongoose
  let allowed_fields = ["username", "password", "firstname"];
  let keys = Object.keys(req.body);
  let is_valid = keys.every((key) => allowed_fields.includes(key));

  if (!is_valid) return res.status(400).send("Invalid Updates");

  try {
    let user = await User.findById(req.params.id);
    if (!user) next(1);

    keys.forEach((field) => {
      user[field] = req.body[field];
    });

    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id, (err, item) => {
    if (!item) return next(1);
    else if (err) return next(err);
  });
  return res.send("User Succesfully Deleted");
};

const errors = (err, req, res, next) => {
  if (err == 1) res.status(400).send("This user doesn't exist");
  if (err) res.status(500).send("Something Went Wrong");
};

module.exports = {
  home,
  profile,
  login,
  logout,
  register,
  updateUser,
  errors,
  deleteUser,
};
