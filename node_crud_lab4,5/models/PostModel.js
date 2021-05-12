const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true, min: 10, max: 20 },
  body: { type: String, required: true, min: 10, max: 500 },
  tags: { type: [String], min: 13 },
});

// created_at: {type: Date, default: Date.now()},
// updated_at: {type: Date},

PostSchema.statics.get_user_posts = function get_user_posts(UserId) {
  // console.log(this.findById(userId))
  return this.where({ UserId });
};

PostSchema.statics.get_posts = function get_posts() {
  return this.find({});
};

PostSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
