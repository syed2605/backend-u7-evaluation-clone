const express=require ('express');
require('dotenv').config();
const connect =require('./config/connect');
const {userController} = require('./routes/user.route');
const  {postController} = require('./routes/post.route');
const {auth}=require('./middleware/auth');

const app=express();
app.use(express.json());

const PORT=process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Homeee")
})

app.use("/users",userController);
app.use(auth);
app.use("/posts",postController);


app.listen(PORT,async()=>{
    try{
        await connect;
        console.log("connection established");
    }catch(err){
        console.log("connection not established");
    }
    console.log("Server listening on http://localhost:8080");
})