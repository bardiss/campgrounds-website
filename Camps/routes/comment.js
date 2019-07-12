var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground"),
    Comment = require("../models/comment");


//========================================
//comments routes... NESTED ROUTES
//========================================
router.get("/camps/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err)
        }else{
            res.render("newComment", {camp: camp})
        }
    });
    
});

router.post("/camps/:id/comments", isLoggedIn,  function(req, res){
    Campground.findById(req.params.id, function(err, foundcamp){
        if(err){
            console.log(err)
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    //comment is object comes from the form and we wanna store it in DB
                    //req.user must be defind cuz of the midddle ware that force u to log in
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //dont forget to save 
                    comment.save();

                    foundcamp.comments.push(comment)
                    foundcamp.save(function(err){
                        if(err){
                            console.log(err)
                        }else{
                            res.redirect('/camps/' + foundcamp._id)
                        }
                    })
                }
            })
            
        }
    })
});
//===== edit comment ==========
router.get("/camps/:id/comments/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, found_comment){
        if (err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("editComment", {campground_id:req.params.id, comment: found_comment}); 
        }

    })
    
});

//======= update comment =========
router.put("/camps/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if (err){
            console.log(err);
            res.redirect("/camps")
        }else{
            res.redirect("/camps/"+ req.params.id);
        }
    });
});

//====== delete comment =========
router.delete("/camps/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if (err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/camps/"+req.params.id);
        }
    })
})

//====== MIDDLE WARE =============
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login")
    
}


module.exports = router;