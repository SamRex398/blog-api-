const express = require('express');
const route = express.Router();
const {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const verify = require('../middlewares/verify');
const {isAdmin, isAuthor} = require('../middlewares/isAdmin');

const isAdminOrAuthor = (req, res, next) => {
    if (isAdmin){
        return next();
    }else if(isAuthor){
        return next();
    }
    res.status(403).send('Forbidden');
};

route.post('/create', verify, isAuthor, createBlog);
route.get('/', getBlogs);
route.put('/update', verify, isAuthor, updateBlog);
route.delete('/delete', verify, isAdminOrAuthor , deleteBlog);

module.exports = route

