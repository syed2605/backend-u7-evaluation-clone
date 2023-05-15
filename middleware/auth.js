const jwt=require('jsonwebtoken');
require('dotenv').config();

const auth=(req,res,next)=>{
    if (!req.headers.auth) res.send("pls login");
    const token = req.headers.auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECERT_KEY, function(err, decoded) {
        if (err) res.send("auth failed");
        else{
            req.body.userId=decoded.userId;
            next();
        }

    });
}
module.exports={
    auth
}