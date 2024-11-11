const jwt=require("jsonwebtoken");
const authAdmin=async(req,res,next)=>{
    try {
        const {atoken}=req.headers;
        console.log("token admin",atoken);
        
        if(!atoken){
        return res.json({success:false,message:"not authorized login "});
        }
        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET);
        console.log("token decode is",token_decode);
        
        if(token_decode!==process.env.ADMIN_PASSWORD+process.env.ADMIN_EMAIL){
            return res.json({success:false,message:"not authorized login "});
        }
        next();

    }catch (error) {
        console.log("error",error);
        return res.json({success:false,message:error.message});
    }
}
module.exports=authAdmin;