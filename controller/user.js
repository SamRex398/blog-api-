const userModel = require('../model/user');
const bcyript = require('bcryptjs');
const jwt = require('jsonwebtoken')

const createUser = async (req, res)=>{
    const {userName, email, age, password} = req.body;

    if(!userName|| !email || !age || !password){
        return  res.json({message: "fill all fields"}).status(400);
    };

    const getUser = await userModel.findOne({email});
    if(getUser){
        return res.json({message: "User exist"});
    };

    const encrypass = bcyript.hashSync(password,10);

    try{
        const newUser = await userModel.create({
            userName,
            email,
            age,
            password: encrypass
        })
        const savedUser = newUser.save()

        res.json({message: "User Created"})
    }catch{
        res.json({
            message: error.message
        })
    }
}
const loginUser = async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({message: "fill all fields"}).status(400);
    }

    const getUser = await userModel.findOne({email});
    if(!getUser){
        return res.json({message: "User not found"}).status(400);
    };

    const verifypass = bcyript.compareSync(password, getUser.password);

    if(!verifypass){
        return res.json({message: "Wrong password"}).status(400);
    }

    const token = jwt.sign(JSON.stringify(getUser), process.env.JWT_SECRET);

    res.cookie('token', token)
    res.json({message: "Logged in successfully"})
}
const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({message: 'Logged out successfully'}).status(200);
};

module.exports = {
    createUser,
    loginUser,
    logoutUser
}