const app = require("express")();
const result = require("dotenv").config();

require("./helpers/ConnectToDB");

// ################################# Models ######################################
const User = require("./models/UserModel");
const Post = require("./models/PostModel");
debugger;
// ################################# Routers #####################################
const UserRoute = require("./routers/UserRouter");
const PostRoute = require("./routers/PostRouter");

app.use("/users", UserRoute);

app.use("/posts", PostRoute);

app.listen(3000, () => {
  console.log("Welcome to my simple and useless server <3");
});
