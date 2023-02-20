const express=require('express');
const cors=require('cors');
require('dotenv').config();
const {userRouter}=require('./routes/User.route');
const {connection}=require('./config/db');
const {noteRouter}=require('./routes/Note.route');
const {authenticate}=require('./middlewares/authenticate')

const app=express();
app.use(cors());
app.use(express.json())

app.use('/user',userRouter);
app.use(authenticate);
app.use('/note',noteRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log('connected to db')
    }catch(err){
        console.log(`cannot connect to db: ${err}`)
    }
    console.log(`Server is running on http://localhost:${process.env.port}`)
})