const express=require('express');
const {NoteModel}=require('../models/Note.model');

const noteRouter=express.Router();


noteRouter.get('/',async(req,res)=>{
    try{
        const notes=await NoteModel.find();
        res.send(notes);
    }catch(err){
        res.send(`Error Occurred while getting Notes: ${err.message}`);
    }
});

noteRouter.post('/create',async(req,res)=>{
    try{
        const note=new NoteModel(req.body);
        await note.save();
        res.send("Note has been created")
    }catch(err){
        res.send(`Error occurred while creating Note: ${err.message}`);
    }
});

noteRouter.patch('/update/:id',async(req,res)=>{
    try{
        await NoteModel.findByIdAndUpdate(req.params.id,req.body);
        res.send(`Data of ID: ${req.params.id} has been updated`);
    }catch{
        res.send(`Error occurred while Updating Data of ID: ${req.params.id}: ${err}`);
    }
});

noteRouter.delete('/delete/:id',async(req,res)=>{
    try{
        await NoteModel.findByIdAndDelete(req.params.id);
        res.send(`Data of ID: ${req.params.id} has been deleted`);
    }catch{
        res.send(`Error occurred while Deleting Data of ID: ${req.params.id}: ${err}`);
    }
});


module.exports={
    noteRouter
}