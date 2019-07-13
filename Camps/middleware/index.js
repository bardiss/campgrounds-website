var Campground = require("../models/campground"),
    Comment= require("../models/comment"); 
var middleware_obj = {};

middleware_obj.check_camp_ownership = function (req, res, next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundcamp){
            if(err){
                req.flash("error", "Campground is not found!")
                res.redirect("back");
            }else{
                
                if(foundcamp.author.id.equals(req.user._id)){
                    next();                     //keep moving 
                }else{
                    req.flash("error", "You don't have permession to do that!")
                    res.redirect("back");
                }
            }
        })
        
    }
    else{
        req.flash("error", "You need to log in first to do that!")
        res.redirect("back")
    }
};

middleware_obj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in first!")
    res.redirect("/login")
};

middleware_obj.check_comment_ownership = function (req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundcomment){
            if(err){
                console.log(err);
                res.redirect("back");
                
            }else{
                
                if(foundcomment.author.id.equals(req.user._id)){
                    next();                     //keep moving 
                }else{
                    req.flash("error", "You don't have permession to do that!")
                    res.redirect("back");
                }
            }
        })
        
    }
    else{
        req.flash("error", "You need to log in first to do that!")
        res.redirect("back");
    }
};



module.exports = middleware_obj;