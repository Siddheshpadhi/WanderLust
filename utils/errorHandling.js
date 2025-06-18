module.exports.errorHandlingMiddleware = (err,req,res,next) => {
    let {status = 500,message = "Some Error Occured"} = err;
    req.flash("error","Error is Occured!");
    res.status(status).render("error.ejs",{err});
    console.log(err);
}