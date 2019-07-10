var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport")

var User = require("../models/user");



router.get("/", function(req, res){
    res.render("landing");
});

//=======================
// Auth routes
//=======================

router.get("/register", function(req, res){
    res.render("register")
});

router.post("/register", function(req, res){
    var New_user = new User({username: req.body.username});
    User.register(New_user, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render("register")
        }

        passport.authenticate("local")(req, res, function(){
            res.redirect("/camps")
        })
    })
});

router.get("/login", function(req, res){
    res.render("login")
});
// app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/camps",
    failureRedirect:"/login"
}), function(req, res){} );


router.use("/logout", function(req, res){
    req.logout();
    res.redirect("/camps")
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login")
    
}


module.exports = router;