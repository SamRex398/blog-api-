const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
    logoutUser
} = require('../controller/user')

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser)

module.exports = router