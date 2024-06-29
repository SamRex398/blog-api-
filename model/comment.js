// - **Comment**: Fields for content, author (reference to User), blogId (reference to Blog), 
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    blog:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel