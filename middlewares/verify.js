const jwt = require('jsonwebtoken')

const verification = async (req, res, next) =>{
    const {token} = req.cookies;

    if(!token){
        return res.json({message: "Please login"}).status(400);
    }

    const verifed = jwt.verify(token,process.env.JWT_SECRET, (err, payload)=>{
        if(err){
            return res.json({
                message: err.message
            }).status(400)
        }else{
            req.user = payload
            // console.log(req.user)
            next()
        }
    })
}

module.exports = verification