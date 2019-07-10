var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment   = require("./models/comment");


data = [
    {
        name:"Tagan",
        image:"https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"very beautiful place, no water, no bathrooms."
    },
    {
        name:"Moon Land",
        image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"wonderful sky view, mountains, water."
    },
    {
        name:"Samar",
        image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"quite place, beautiful nature, water, no signal."
    },
    {
        name:"Tommy",
        image:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"wonderful place, no signal, water is available."
    }
]

function seedDB (){
    //remove camps
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
    });
/*
    //add camps
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            }else{
                console.log("campground added")
                // add comments
                //inside call back to gurantee creation of the camp comes first
                Comment.create(
                    {
                        text:"This place is great, but I wish there was internet",
                        author:"samar"
                    }, function(err, comment){
                        if (err){
                            console.log(err)
                        }else{
                            campground.comments.push(comment)
                            campground.save();
                            console.log("comment created")
                        }
                    }
                )
            }
        })
    })
*/
    
}

module.exports = seedDB;