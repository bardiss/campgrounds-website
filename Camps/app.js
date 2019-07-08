var express = require("express"),               //include express in our app
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localstrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");




 //assign express we included to var which we can use easly(var.method)
var app = express();   
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))


mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});
////////
seedDB();
///////// passport configuration ////////
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

//basic routes

app.use(function(req, res, next){
    res.locals.CurrentUser = req.user;
    next();
});

app.get("/camps", function(req, res){

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
app.post("/camps", function(req, res){
    
    var name = req.body.name
    var img = req.body.image
    var desc = req.body.description
    var NewCamp = {name: name, image: img, description: desc}; //create object to add it to the array of objects (campgrounds)
    Campground.create(NewCamp, function(err, addedCamp){
        if (err){
        console.log(err)
        }else{
            res.redirect("/camps");   //default it's get request
        }
    })

    

});


// Just render the form to create new campground
app.get("/camps/new", function(req, res){
    res.render("new");
});


app.get("/camps/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundcamp){
        if(err){
            console.log(err)
        }else{
            console.log(foundcamp)
            res.render("show", {camp: foundcamp})
        }
    })
    
})



app.get("/", function(req, res){
    res.render("landing");
});





//=================
//comments routes
//==================
app.get("/camps/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err)
        }else{
            res.render("newComment", {camp: camp})
        }
    })
    
});

app.post("/camps/:id/comments", isLoggedIn,  function(req, res){
    Campground.findById(req.params.id, function(err, foundcamp){
        if(err){
            console.log(err)
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
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

//=======================
// Auth routes
//=======================

app.get("/register", function(req, res){
    res.render("register")
});

app.post("/register", function(req, res){
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

app.get("/login", function(req, res){
    res.render("login")
});
// app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local",
{
    successRedirect: "/camps",
    failureRedirect:"/login"
}), function(req, res){} );


app.use("/logout", function(req, res){
    req.logout();
    res.redirect("/camps")
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login")
    
}


//===============================================
// to strart the server
app.listen(3000, function(){
    console.log("server has been started");
});