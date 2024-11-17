const jwt=require("jsonwebtoken");
const authDoctor=async(req,res,next)=>{
    try {
        const {dtoken}=req.headers;
        console.log("token user",dtoken);
        
        if(!dtoken){
        return res.json({success:false,message:"not authorized login "});
        }
        const token_decode=jwt.verify(dtoken,process.env.JWT_SECRET);
        console.log("token decode is",token_decode);
        
        
        req.doctor = { id: token_decode.id };
        console.log("req user",req.doctor,"idddd",token_decode.id);
        
        next();

    }catch (error) {
        console.log("error",error);
        return res.json({success:false,message:error.message});
    }
}
module.exports=authDoctor;