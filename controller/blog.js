/*
Implement CRUD operations for blogs:
- Create: Only authenticated users can create.
- Read: All users can read.
- Update/Delete: Only authors or admins can update or delete.
*/

const user = require('../model/user');
const blogModel = require('../model/blog');
const jwt = require('jsonwebtoken')

const createBlog = async (req, res)=>{
    const {title, content} = req.body;
    const author = req.user.userName;

    if(!title || !content){
        return res.json({message: 'input all required fields'}).status(400);
    }

    try{
        const newblog = await blogModel.create({
            title,
            content,
            author
        });
        const saveBlog = newblog.save()

        res.json({message: 'Blog created'}).status(200);
    }catch(err){
        res.json({message: err.message}).status(400);
    }
}

const getBlogs = async (req, res)=>{
    try{
        const blogs = await blogModel.find();
        res.json(blogs.map(blog=>({
            title: blog.title,
            author: blog.author,
            content: blog.content            
        })
    )).status(200);
    }catch(err){
        res.json({message: err.message}).status(400);
    }
}

const updateBlog = async (req, res)=>{
    const {author, id, ...others} = req.body;
    
    try{
        const update= await blogModel.findByIdAndUpdate(id, {...others}, {new: true});
        console.log(update)
       
        res.json({
            title: update.title,
            author: update.author,
            content: update.content
        }).status(200);
    }catch(err){
        res.json({message: err.message}).status(400);
    }
}

const deleteBlog = async (req, res)=>{
    const {id} = req.body;
    try{
        const deleted = await blogModel.findByIdAndDelete(id);
       return res.json({message: 'Blog deleted'}).status(200);
    }catch(err){
        return res.json({message: err.message}).status(400);
    }
}


module.exports = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog
}