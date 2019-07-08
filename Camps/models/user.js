var mongoose = require("mongoose"),
    PassportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    name : String,
    password : String
});

userSchema.plugin(PassportLocalMongoose)

module.exports = mongoose.model("user", userSchema);