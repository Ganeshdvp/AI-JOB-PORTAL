// role based authorized
export const roleAuth = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: "Your are not eligible to access this page!"})
        }
        next();
    }
}