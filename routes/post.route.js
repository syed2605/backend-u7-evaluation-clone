const {Router} = require("express");
const postController=Router();
const {PostModel} = require('../model/post.model')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();


postController.get("/",async (req,res)=>{
    const posts= await PostModel.find({userId:req.body.userId});
   res.send(posts);
});

postController.post("/",async (req,res)=>{
    const {title,device,body,userId}=req.body;
    const post=new PostModel({
        title,device,body,userId
    })
    try{
        await post.save();
        res.send("posssst createdddd")
    }catch(err){
        res.send("something wentt wrong")
    }
 });

 postController.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params;
    console.log(id,"iddddddd");
    const deletedpost= await PostModel.findOneAndDelete({_id:id,userId:req.body.userId});
   if (deletedpost) res.send(deletedpost);
   else res.send("post not find");
});
postController.patch("/update/:id",async (req,res)=>{
    const {id}=req.params;
    console.log(id,"iddddddd");
    const updatedpost= await PostModel.findOneAndUpdate({_id:id,userId:req.body.userId},{...req.body});
   if (updatedpost) res.send(await PostModel.find({_id:id,userId:req.body.userId}));
   else res.send("post not find");
});

module.exports={
    postController
}