const Joi = require("joi");
const passport = require("passport");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            url:Joi.string().allow("",null),
            filename:Joi.string().allow("",null),
        }),
        price: Joi.number().required(),
        country: Joi.string().required(),
        location: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
});

module.exports.userSchema = Joi.object({
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
});



