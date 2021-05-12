const express = require("express");
const PostRoute = express();
// const PostRoute = express.Router();

const bodyParser = require("body-parser");
// app.set('view engine', 'ejs')

// ############################# User Model ###############################
const Post = require("../models/PostModel");

// ######################### User Validation ##############################
const PostSchema = require("../validation/PostValidation.js");
const validator = require("express-joi-validation").createValidator({});

PostRoute.use(bodyParser());
PostRoute.use(express.json());

PostRoute.get("/", async (req, res) => {
  let posts = await Post.get_posts();
  res.send(posts);
});

PostRoute.get("/:userId", async (req, res) => {
  let posts = await Post.get_user_posts(req.params.userId);
  res.send(posts);
});

PostRoute.post("/create", validator.body(PostSchema), (req, res) => {
  let { UserId, title, body, tags } = req.body;
  let post = Post.create({ UserId, title, body, tags });
  res.send(UserId + " - " + title + " - " + body + " - " + tags);
});

// PostRoute.patch('/:id', (req, res) => {

// })

PostRoute.delete("/:id", async (req, res, next) => {
  await Post.findByIdAndRemove(req.params.id, (err, item) => {
    if (item == null) return res.status(400).send("This Id Doesnt Exist");
    else if (err) return next(err);
    return res.send("Post Succesfully Deleted");
  });
});

PostRoute.patch("/:id", (req, res, next) => {
  let id = req.params.id;
  User.findByIdAndUpdate(id, { ...req.body }, { new: true }, (err, post) => {
    if (err) return next(err);
    return res.send(post);
  });
});

PostRoute.use((err, req, res, next) => {
  if (err) res.status(500).send("Server error");
});

module.exports = PostRoute;
