const {Router} = require("express");
const userController=Router();
const {UserModel} = require('../model/user.model')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();


userController.post("/register",(req,res)=>{
    const {name,email,gender,password}=req.body;
    console.log(req.body);
    bcrypt.hash(password, 10, async function(err, hash) {
        // Store hash in your password DB.
        if (err) res.send("something went wrong");
        const user=new UserModel({
            name,email,gender,password:hash
        })
        try{
            await user.save();
            res.send("user createdddd")
        }catch(err){
            res.send("something went wrong")
        }
    });
});
userController.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    var hash=user.password;
    bcrypt.compare(password, hash, function(err, result) {
        if ( result == true){
            var token = jwt.sign({userId:user._id},process.env.JWT_SECERT_KEY);
            res.send({message:"Login Suceess",token});
        }else{
            res.send("Invalid cred");
        }
        if (err) res.send("Something wrong");

    });
    
});
module.exports={
    userController
}