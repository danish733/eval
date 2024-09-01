
const admin = (req,res,next)=>{
    if(req.user.role === "admin"){
        next()
    }
    else{
        res.status(200).json({message:"You are not admin"})
    }
}