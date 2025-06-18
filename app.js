if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");



//Routing For Each Route
const listingsRouter = require("./routes/listings.js"); 
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

//Saving Information Of User in Server Side
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");

//Passport For User Authentication
const passport = require("passport");
const localStrategy = require("passport-local"); //local Strategy
const User = require("./models/user.js");
const { errorHandlingMiddleware } = require("./utils/errorHandling.js");
const { pageNotFound } = require("./routes/error.js");
const MongoStore = require("connect-mongo");

//Inbuilt MiddleWares Used For the Project
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);


//Connection With Database
const dbUrl = process.env.ATLASDB_URL;
main()
    .then((res) => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    try{
        await mongoose.connect(dbUrl);
    }catch(err){
        console.log(err);
    }
}

//Holds the Cookie to be stored on CLient Side

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24*3600
})

store.on("error", (error) => {
    console.log("Error in connection",error)
})

const sessionOptions = {
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
    store
}



//Implementation of the Session as a MiddleWare
app.use(session(sessionOptions));
app.use(flash());

//Passport Initialization and Strategy Utilization
//To be Done after Implementation of Session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Using Connect Flash Inorder to Display something or Alert
app.use((req,res,next) => {
    res.locals.errorMsg = (req.flash("error")); //To use connect flash if error
    res.locals.successMsg = (req.flash("success")); //To use connect flash if error
    if(req.user){
        res.locals.currUser = req.user;
    }
    else res.locals.currUser = '';
    next();
})

app.listen(8080,() => {
    console.log("Server is listening to 8080");
})

app.use("/listings",listingsRouter);
app.use("/listing",listingRouter);
app.use("/listings",reviewRouter);
app.use("/",userRouter);

//For Random Routes
app.all("*",pageNotFound);

//Error Handling MiddleWare
app.use(errorHandlingMiddleware);