const express=require('express');
const userRouter=express.Router();
const {UserModel}=require('../models/User.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();

userRouter.post('/register',async(req,res)=>{
    const {name,email,pass,age}=req.body;
    try{
        bcrypt.hash(pass, Number(process.env.saltRounds), async(err, hash) =>{
            if(err)res.send(`Error Occurred While Registering: ${err}`);
            else{
                const user=new UserModel({name,email,pass:hash,age});
                await user.save();
                res.send('Registered');
            }
            
        });
    }
    catch(err){
        res.send(`Error Occurred While Registering: ${err}`);
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,pass}=req.body;
    try{
        const user=await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
                if(result){
                    const token=jwt.sign({user:user[0].name},process.env.secretKey);
                    res.send({"msg":"login successfull","token":token})
                }
                else{
                    res.send(`Wrong Credentials`)
                }
            });
        }
        
    }
    catch(err){
        res.send(`Wrong Credentials`)
    }
})

module.exports={
    userRouter
}