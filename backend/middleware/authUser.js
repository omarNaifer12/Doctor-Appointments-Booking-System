const jwt=require("jsonwebtoken");
const authUser=async(req,res,next)=>{
    try {
        const {token}=req.headers;
        console.log("token user",token);
        
        if(!token){
        return res.json({success:false,message:"not authorized login "});
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log("token decode is",token_decode);
        
        
        req.user = { id: token_decode.id };
        console.log("req user",req.user,"idddd",token_decode.id);
        
        next();

    }catch (error) {
        console.log("error",error);
        return res.json({success:false,message:error.message});
    }
}
module.exports=authUser;