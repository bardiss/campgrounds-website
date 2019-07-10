var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {
//one to one so each comment has only one aithor with only one id 
//but in camps one to many (one camp to many comments..)

        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        username:String
    }
});

module.exports = mongoose.model("Comment", commentSchema);


