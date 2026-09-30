const jwt = require('jsonwebtoken');
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const secretKey = process.env.SECRET_JWT;


const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

const requireAuth = (req,res,next)=>{
    const notSplittedToken = req.headers.authorization;
    const splitted = notSplittedToken.split(' ');
    const token = splitted[1];
    console.log("Token : "+ token);
    if(token){
        jwt.verify(token,secretKey,(err,decodedToken)=>{
            if(err){
                return res.status(401).json({error: "Unauthorized"})
            }else{
                req.user = decodedToken;
                next();
            }
        })
    }else{
        return res.status(401).json({error: "Unauthorized"});
    }
}

const expiresIn = "1h"

app.post('/login',(req,res)=>{
    const{ username, password}=req.body;
    const user =users.find(u=>u.username===username && u.password === password);
    if(user){
        const token = jwt.sign({username: user.username,id: user.id},secretKey,{expiresIn});
        res.json({token});
    } else{
        res.status(401).json({error:"Unauthorized"})
    }
});




app.get('/users',requireAuth, (req,res)=> {
    res.json(users);
}); 

app.listen(PORT,()=> {
    console.log(`serveur is running on http://localhost:${PORT}`);
});