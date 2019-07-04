var express = require("express"); //include express in our app
var bodyParser = require("body-parser");


var app = express();    //assign express we included to var which we can use easly(var.method)


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
////////
var campgrounds =  [        //array of objects
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
]; 

//basic routes

app.get("/camps", function(req, res){

    res.render("camps", {camps:campgrounds}); //send object its name camps and take its value from campgrounds var
});


//take the info in post req. came from the form and craete camp object then add it to campgrounds array
//the 2nd time we run the server the campgrounds return back with its initial camps
app.post("/camps", function(req, res){
    var name = req.body.name
    var img = req.body.image
    var NewCamp = {name: name, image: img}; //create object to add it to the array of objects (campgrounds)
    campgrounds.push(NewCamp);

    res.redirect("/camps");   //default it's get request

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