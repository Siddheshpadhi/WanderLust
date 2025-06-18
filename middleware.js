const Listing = require("./models/listing");
const review = require("./models/review");

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        //need to store the url from which was it earlier called
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","Please Login to Proceed Further");
        req.session.save((err) => {
            if(err) return next(err);
            else res.redirect("/login");
        })
    }
    else return next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
    res.locals.redirectUrl = req.session.redirectUrl; 
    next();
}

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have access to edit the listing");
        return res.redirect(`/listings/${id}`);
    }
    else next();
}

module.exports.isOwnerReview = async (req,res,next) => {
    let {reviewId} = req.params;
    let review1 = await review.findById(reviewId); 
    let {owner} = review1;
    if(!owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have access to edit the review");
        return res.redirect(`/listings/${id}`);
    }
    else next();
}