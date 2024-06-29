const commentModel = require('../model/comment');

const createComment = async (req, res)=>{
    const { comment} = req.body;
    const {blogId} = req.params;


    if(!comment || !blogId){
        return res.json({message: "Error sending comment"}).status(400);
    }    ;
    const author = req.user.userName;

    if(!author){
        return res.json({message: "You must be logged in  to comment"}).status(404);
    };

    try{
        const newComment = await commentModel.create({comment, blog: blogId, author});
        const savedComment = await newComment.save()
        res.json({
            comment: savedComment.comment
        }).status(200)
    }catch(err){
        console.log(err)
        res.json({message: err.message})
    }
}
const getComments = async (req, res)=>{
    const {blogId} = req.params;
    try{
        const comments = await commentModel.find({blog: blogId});
    res.json(
        comments.map(comment=>({
            comment: comment.comment,
            author: comment.author
        }))
    ).status(200);
    }catch(err){
        res.json({message: err.message}).status(400);
    }
}

module.exports = {createComment, getComments}