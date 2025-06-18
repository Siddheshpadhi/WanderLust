const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const { signUp, signedUp, logIn, LoggedIn, logOut } = require("../controllers/userInfo");


router.route("/signup")
    .get(signUp)//Form for Signup
    .post( wrapAsync (signedUp));//Sign Up Route Execution

router.route("/login")
    .get(logIn)//Form for login
    .post(saveRedirectUrl,passport.authenticate('local',{failureRedirect: '/login',failureFlash : true}), wrapAsync(LoggedIn));//Login Route Execution

router.get("/",signUp);
//LogOut Route Execution
router.get("/logout",logOut);

module.exports = router;