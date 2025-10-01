const express=require("express")
const User=require("../models/User")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const router=express.Router()

router.post("/register",async(req,res)=>{
    try{
const {name,email,password,role}=req.body
if(await User.findOne({email})) return res.status(400).json({message:"emaail exist try different emaiil"})
    const validRoles=["admin","user"]
const userRole=validRoles.includes(role)?role :"user"

    const user= await User.create({
name,
email,
password,
role:userRole
    })
const token=jwt.sign({id:user._id,role:user.role},
    process.env.JWT_SECRET,
{
    expiresIn:"1d"
})
console.log(`token from auth page ${token}`)
res.status(200).json({token,user})

    }
    catch(err){
        res.status(500).json({message:err.message})

    }
})
router.post("/login",async(req,res)=>{
    try{
const{email,password}=req.body
const user=await User.findOne({email})
if(!user) return res.status(400).json({message:"wrong eail or password"})
    const matchPassword=await bcrypt.compare(password,user.password)
if(!matchPassword)return res.status(400).json({message:"wrong password"})
const token=jwt.sign({id:user._id,role:user.role},
    process.env.JWT_SECRET,
{
    expiresIn:"1d"
})
res.json({token,user})
    }
    catch(err){
res.status(500).json({message:err.message})
    }
})
module.exports = router;