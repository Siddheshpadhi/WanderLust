if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}

const mongoose = require("mongoose");
const initData = require("./init.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
console.log(process.env.MAP_TOKEN);
main()
    .then((res) => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    try{
        await mongoose.connect(process.env.ATLASDB_URL);
    }catch(err){
        console.log(err);
    }
}

async function initDB() {
    await Listing.deleteMany({});
    try {
        const dat = initData.data.map((obj) => ({...obj,owner: '6819f9744b299abdf4648cf0'}));
        for(oneDat of dat){
            let response = await geocodingClient.forwardGeocode({
            query: oneDat.location,
            limit: 1
            }).send()
            let newListing = new Listing(oneDat);
            // console.log(response.body.features[0].geometry);
            newListing.geometry = response.body.features[0].geometry;
            oneDat.geometry = response.body.features[0].geometry;
            // console.log(newListing);
            await newListing.save();
            oneDat = newListing;
            }
        console.log(dat);
        await Listing.insertMany(dat);
        console.log("data is reinitialized");
    } catch (error) {
        console.log(error);
    }
    
}

initDB();