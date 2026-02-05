import jwt from "jsonwebtoken";

const isAuth = (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"You are not authenticated!"})
        }
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(401).json({message:"You are not authenticated!"})
            }
            req.user = user;
            next();  
        })
    } catch (error) {
        return res.status(500).json({message:"isAuth middleware error"})
    }   
}

export default isAuth;