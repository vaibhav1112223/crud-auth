const jwt=require("jsonwebtoken")
const check=(roles=[])=>(req,res,next)=>{
     if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
     console.log(req.headers.authorization);
    const token=req.headers.authorization.split(" ")[1]
    if(!token) return res.status(401).json({message:"you are not allow to accces"})
        try{
const verified=jwt.verify(token,process.env.JWT_SECRET)
console.log(verified)
if(roles.length && !roles.includes(verified.role))
return res.status(403).json({message:"you are not allow to access"})
req.user=verified
next()

    }
    catch(err){
res.status(401).json({message:"invalid data"})
    }
}
module.exports=check




