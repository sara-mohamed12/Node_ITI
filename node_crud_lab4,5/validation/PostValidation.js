const Joi = require('joi')
const app = require('express')()
Joi.objectId = require('joi-objectid')(Joi)

 
const PostSchema = Joi.object({
    UserId      : Joi.objectId(),
    title       : Joi.string().min(10).max(20).required(),
    body        : Joi.string().min(10).max(500).required(),
    tags        : Joi.array().items(Joi.string())
})



module.exports = PostSchema;