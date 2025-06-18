const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.createRoute = (req,res) => {
    res.render("listings/add.ejs");
}

module.exports.addListing =  async (req,res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send()
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.geometry = response.body.features[0].geometry;
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","Listing is Registered!");
    res.redirect("/listings");
}

module.exports.editRoute = async (req,res) => {
    let {id} = req.params;
    let oldListing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!oldListing){
        req.flash("error","Listing is not found")
        res.redirect("/listings");
    }
    originalImageUrl = oldListing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_200,w_200");
    originalImageUrl = originalImageUrl.replace("w=800&q=60","w=200&q=30");
    res.render("listings/edit.ejs",{oldListing,originalImageUrl});
}

module.exports.deleteRoute = async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing is deleted");
    res.redirect("/listings");
}

module.exports.updateRoute = async (req,res) => {
    let {id} = req.params;
    let {price} = req.body.listing;
    req.body.listing.price = Number(price);
    let listing = await Listing.findByIdAndUpdate(id,{ ...req.body.listing });

    //if user has send file
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","listing is updated!");
    res.redirect(`/listings/${id}`);
}