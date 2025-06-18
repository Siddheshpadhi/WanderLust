const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { indexRoute, showRoute, searchRoute, filterRoute } = require("../controllers/listingsInfo.js");
//Index Route or Home Route
router.get("/",wrapAsync(indexRoute));

router.get("/search",wrapAsync(searchRoute));

//Individual Listing Route
router.get("/:id",wrapAsync(showRoute));

router.get("/find/:filter",(filterRoute));

module.exports = router;