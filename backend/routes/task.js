const express=require("express")
const Task=require("../models/Task")
const check=require("../middlewares/authMiddleWare")
const router=express.Router()

router.post("/",check(["admin","user"]),async(req,res)=>{
try{
const task= await Task.create({...req.body,user:req.user.id})
res.status(201).json({task})
}
catch(err){
    res.status(500).json({message:err.message})

}
})

router.get("/",check(["admin","user"]),async(req,res)=>{
    try{
    const tasks=req.user.role==="admin"?await Task.find():await Task.find({user:req.user.id})
    res.json(tasks)
    }
    catch(err){
        res.status(500).json({message:err.message})

    }
})


router.put("/:id",check(["admin","user"]),async(req,res)=>{
    try{
const task=await Task.findById(req.params.id)
if(!task)return res.status(404).json({message:"not aallowed to update"})
const owner=task.user.toString()==req.user.id
if(req.user.role!=="admin" && !owner){
    return res.status(404).json({message:"you are not allowed uodate the task"})
}
const updatedTask=await Task.findByIdAndUpdate(req.params.id,
    req.body,
    {new:true}
)
res.json(updatedTask)
    }
    catch(err){
res.status(500).json({message:err.message})
    }
})

router.delete("/:id",check(["admin","user"]),async(req,res)=>{
try{
    const task=await Task.findById(req.params.id)
    if(!task) return res.status(404).json({message:"you are not aallow to delete"})
        if(req.user.role!=="admin" && task.user.toString()!==req.user.id){
            res.status(404).json({message:"you are not allowed to delete"})
        }
       await Task.findByIdAndDelete(req.params.id)
        res.json(task,{message:"deleted task"})}
        catch(err){
            res.status(500).json({message:err.message})
        }
})
module.exports = router;