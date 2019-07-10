var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require ("../models/campground")


router.get("/camps", function(req, res){

    Campground.find({}, function(err, AllFoundCamps){
        if(err){
            console.log(err)
        }else{
            res.render("index", {camps:AllFoundCamps}); //send object its name camps and take its value from campgrounds var  
        }
    })

    
});


//take the info in post req. came from the form and craete camp object then add it to campgrounds array
//the 2nd time we run the server the campgrounds return back with its initial camps
router.post("/camps", isLoggedIn, function(req, res){
    
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.description;
    var id = req.user._id;
    var username = req.user.username;
    var NewCamp = {name: name, image: img, description: desc, author:{ id: id, username: username}}; //create object to add it to the array of objects (campgrounds)
    Campground.create(NewCamp, function(err, addedCamp){
        if (err){
        console.log(err)
        }else{
            res.redirect("/camps");   //default it's get request
        }
    })

    

});


// Just render the form to create new campground
router.get("/camps/new", isLoggedIn, function(req, res){
    res.render("new");
});


router.get("/camps/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundcamp){
        if(err){
            console.log(err)
        }else{
            console.log(foundcamp)
            res.render("show", {camp: foundcamp})
        }
    })
    
});


//====== MIDDLE WARE =============
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login")
    
}



module.exports = router;