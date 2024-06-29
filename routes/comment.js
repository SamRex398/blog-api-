const express = require('express');
const route = express.Router();
const {} = require('../controller/blog');
const verify = require('../middlewares/verify');
const { createComment, getComments } = require('../controller/comment');


route.post('/writeComment/:blogId', verify, createComment);
route.get('/:blogId', getComments);


module.exports = route;