
mongoose = require("mongoose");

campgroundSchema = new mongoose.Schema ({
    name : String,
    image: String
});

module.exports = mongoose.model("campground", campgroundSchema)