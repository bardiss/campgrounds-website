var express = require("express"),               //include express in our app
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground")




 //assign express we included to var which we can use easly(var.method)
var app = express();   
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/yelp_camp")
////////


//basic routes

app.get("/camps", function(req, res){

    Campground.find({}, function(err, AllFoundCamps){
        if(err){
            console.log(err)
        }else{
            res.render("camps", {camps:AllFoundCamps}); //send object its name camps and take its value from campgrounds var  
        }
    })

    
});


//take the info in post req. came from the form and craete camp object then add it to campgrounds array
//the 2nd time we run the server the campgrounds return back with its initial camps
app.post("/camps", function(req, res){
    var name = req.body.name
    var img = req.body.image
    var NewCamp = {name: name, image: img}; //create object to add it to the array of objects (campgrounds)
    Campground.create(NewCamp, function(err, addedCamp){
        if (err){
        console.log(err)
        }else{
            res.redirect("/camps");   //default it's get request
        }
    })

    

});


// Just render the form to create new campground
app.get("/new", function(req, res){
    res.render("new");
})

app.get("/", function(req, res){
    res.render("landing");
});




app.get("/*", function(req, res){
    res.send("hi there");
});


// to strart the server
app.listen(3000, function(){
    console.log("server has been started");
});