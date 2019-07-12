var express = require("express"),               //include express in our app
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localstrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

var Method_override = require("method-override");

// ===== include the routes =========

var index_routes = require("./routes/index"),
    camps_roures = require("./routes/camps"),
    comment_routes = require("./routes/comment");


 //assign express we included to var which we can use easly(var.method)
var app = express();   
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(Method_override("_method"));


mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});

//====== SEED THE DATA BASE ========

//seedDB();

// ===== passport configuration =====
app.use(require("express-session")({
    secret: "mrs watermelon is beautiful",
    resave: false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//==================================================
// arrangement is important, it must come first before routes.
app.use(function(req, res, next){
    res.locals.CurrentUser = req.user;
    next();
});
//===================================================

app.use(index_routes);
app.use(camps_roures);
app.use(comment_routes);

//====================================================

// to strart the server
app.listen(3000, function(){
    console.log("server has been started");
});