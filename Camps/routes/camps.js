var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require ("../models/campground");
var MiddlewareObj = require("../middleware/index");



//take the info in post req. came from the form and craete camp object then add it to campgrounds array
//the 2nd time we run the server the campgrounds return back with its initial camps
router.post("/camps", MiddlewareObj.isLoggedIn, function(req, res){
    
    var name = req.body.name;
    var img = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var id = req.user._id;
    var username = req.user.username;
    var NewCamp = {name: name, price:price, image: img, description: desc, author:{ id: id, username: username}}; //create object to add it to the array of objects (campgrounds)
    Campground.create(NewCamp, function(err, addedCamp){
        if (err){
        console.log(err)
        }else{
            res.redirect("/camps");   //default it's get request
        }
    })

    

});

router.get("/camps", function(req, res){
/*
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
           res.render("index",{camps:allCampgrounds});
        }
     });*/
     res.render("register")
 });



// Just render the form to create new campground
router.get("/camps/new", MiddlewareObj.isLoggedIn, function(req, res){
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
//====== Edit Route =============
router.get("/camps/:id/edit", MiddlewareObj.check_camp_ownership, function(req, res){
    Campground.findById(req.params.id, function(err, foundcamp){
        if(err){
            res.redirect("/camps");
        }else{
            res.render("edit_form", {camp: foundcamp}); 
        }
    });
    
});

//====== Update Route =============

router.put("/camps/:id", MiddlewareObj.check_camp_ownership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.Edited_camp, function(err, foundcamp){
        if (err){
            res.redirect("/camps")
        }else{
            res.redirect("/camps/"+ req.params.id)
        }
    })
});

//======= Delete Route ===========

router.delete("/camps/:id", MiddlewareObj.check_camp_ownership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err, foundcamp){
        if(err){
            res.redirect("/camps");
        }else{
            res.redirect("/camps");
        }
    });
});



module.exports = router;