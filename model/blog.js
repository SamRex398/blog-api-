// - **Blog**: Fields  title, content, author (reference to User), 

const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true
    }

},{
    timestamps: true
})

const blogModel = mongoose.model('blog', blogSchema)

module.exports = blogModel 