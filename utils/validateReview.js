const ExpressError = require("./ExpressError.js");
const {reviewSchema} = require("../schema.js");

module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400,error);
    }
    else next();
}