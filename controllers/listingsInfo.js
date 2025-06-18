const Listing = require("../models/listing");


module.exports.indexRoute = async (req,res) => {
    let allListings = await Listing.find({});
    res.render("listings/allListings.ejs",{allListings});
};

module.exports.showRoute = async (req,res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path: "reviews",populate : { path: "owner"}}).populate("owner");
    if(!listing) {
        req.flash("error","Listing Does Not Exists");
        res.redirect("/listings");
    }
    else res.render("listings/show.ejs",{listing});
};

module.exports.searchRoute = async (req,res,next) => {
    let searchTitle = req.query.title;
    searchTitle = searchTitle.toLowerCase();
    let allListings = await Listing.find().select('title');
    const titles = allListings.map(u => u.title);
    let flag = false;
    let list = [];
    for(title of titles){
        oneTitle = title.toLowerCase();
        if(oneTitle.includes(searchTitle)){
            flag = true;
            oneListing = await Listing.findOne({title: title});
            list.push(oneListing);
        }
    }
    if(flag === true){
        res.render("listings/search.ejs",{list});
    }else {
        req.flash("error","Listing Does Not Exists with that title");
        res.redirect("/listings");
    }
}

module.exports.filterRoute = async (req,res) => {
    let {filter} = req.params;
    let list = await Listing.find({category: filter});
    res.render("listings/search.ejs",{list});
}