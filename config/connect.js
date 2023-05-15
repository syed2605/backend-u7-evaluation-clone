const mongoose=require('mongoose');
require('dotenv').config();


const connect=mongoose.connect(process.env.MONGO_URL);

module.exports={
    connect
}