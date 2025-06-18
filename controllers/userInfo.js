const User = require("../models/user");

module.exports.signUp = (req,res) => {
    res.render("users/signup.ejs");    
}

module.exports.signedUp = async (req,res,next) => {
    try {
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        let registeredUser = await User.register(newUser,password);
        req.logIn(registeredUser,(err) => { //for automatic login after signup
            if(err) return next(err);
            else {
                req.flash("success","User is registered  Welcome to Wanderlust!!!");
                res.redirect("/listings");
            }
        })
    } catch(e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}

module.exports.logIn = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.LoggedIn = async (req,res) => {
    req.flash("success","Welcome to Wanderlust!!!");
    if(res.locals.redirectUrl) res.redirect(res.locals.redirectUrl);
    else res.redirect("/listings");
};

module.exports.logOut = (req,res,next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success","You have been successfully logged out!!!");
        res.redirect("/listings");
    })
}