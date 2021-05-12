const Joi = require("joi");

const UserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  firstname: Joi.string().min(3).max(15),
  age: Joi.number().integer().min(13),
});

module.exports = UserSchema;
