const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const commentRoute = require('./routes/comment')

app.use(cookieParser())
mongoose.connect(
    process.env.Mongoose_Url
).then(()=>{
    console.log("database conected successfully!")
}).catch((error)=>{
    console.log(error)
})

app.use(express.json())

app.use('/user', userRoute)
app.use('/blog', blogRoute)
app.use('/comment', commentRoute)

app.listen(5000, ()=>{
    console.log("app running")
})