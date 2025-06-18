const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const {validateListing} = require("../utils/validateListing.js");
const { createRoute, addListing, editRoute, deleteRoute, updateRoute } = require("../controllers/listingInfo.js");
const {storage} = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage })

router.route("/new")
    .get(isLoggedIn,createRoute) 
    .post(upload.single("listing[image][url]"),isLoggedIn,validateListing,wrapAsync(addListing));

router.route("/:id")
.get(isLoggedIn,wrapAsync(editRoute))
.delete(isLoggedIn,isOwner,wrapAsync(deleteRoute))
.put(upload.single("listing[image][url]"),isLoggedIn,isOwner,validateListing,wrapAsync(updateRoute));


module.exports = router;
