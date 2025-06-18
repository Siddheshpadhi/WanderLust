const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema")

module.exports.validateListing = (req,res,next) => {
    console.log(req.body);

    let {error} = listingSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400,error)
    }
    else next();
}
