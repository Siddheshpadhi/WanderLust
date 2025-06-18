const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwnerReview } = require("../middleware.js");
const { validateReview } = require("../utils/validateReview.js");
const { addRoute, deleteRoute } = require("../controllers/reviewInfo.js");

//Add Route
router.post("/:id/review",isLoggedIn,validateReview,wrapAsync(addRoute));

//Delete Route
router.delete("/:id/review/:reviewId",isLoggedIn,isOwnerReview,wrapAsync(deleteRoute));

module.exports = router;