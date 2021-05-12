const express = require("express");
const UserRoute = express();

const bodyParser = require("body-parser");

const UserApi = require("../api/users");

// middlewares
let Auth = require("../middlewares/Auth");

// User Model
const User = require("../models/UserModel");

// User Validation
const UserSchema = require("../validation/UserValidation");
const validator = require("express-joi-validation").createValidator({});

UserRoute.use(bodyParser());
UserRoute.use(express.json());

UserRoute.get("/", Auth, UserApi.home);

UserRoute.get("/me", Auth, UserApi.profile);

UserRoute.post("/login", UserApi.login);

UserRoute.get("/logout", Auth, UserApi.logout);

UserRoute.post("/register", validator.body(UserSchema), UserApi.register);

UserRoute.delete("/:id", UserApi.deleteUser);

UserRoute.patch("/:id", UserApi.updateUser);

UserRoute.use(UserApi.errors);

module.exports = UserRoute;
