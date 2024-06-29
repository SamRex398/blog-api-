// - **User**: Fields  username, email,age, password, and role.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['User', 'author', 'admin'],
        default: "User",
    },
},
{
    timestamps: true
})

const userModel =  mongoose.model('user', userSchema)

module.exports = userModel