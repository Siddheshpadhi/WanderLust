const ExpressError = require("../utils/ExpressError.js");

module.exports.pageNotFound = (req,res,next) => {
    next(new ExpressError(404,"Page Not Found!"));
}