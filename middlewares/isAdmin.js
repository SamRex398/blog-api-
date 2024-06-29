
const isAdmin = async (req, res, next)=>{
    const {role} = req.user.role

    if(role !== 'admin'){
        return res.json({message: "Access denied"}).status(400)
    }else{
        next()
    }
    
}

const isAuthor = async (req, res, next)=>{
    const {role} = req.user.role
    console.log(role)
    if(role !== 'author'){
        return res.json({message: "Access denied"}).status(400)
    }else{
        next()
        
    }
}

module.exports = {isAdmin, isAuthor}