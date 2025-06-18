const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.addRoute = async function(req,res) {
    let {review} = req.body;
    const review1 = new Review(review);
    let {id} = req.params;
    let listing = await Listing.findById(id);
    review1.owner = req.user._id;
    listing.reviews.push(review1);
    await review1.save();
    req.flash("success","New Review Created!");
    await listing.save();
    res.redirect(`/listings/${id}`);
};

module.exports.deleteRoute = async (req,res) => {
    let { id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});//IMP
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review is Deleted");
    res.redirect(`/listings/${id}`);
}