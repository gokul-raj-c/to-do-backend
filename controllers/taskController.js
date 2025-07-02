const {response}=require("express");
const taskModel=require("../models/task");
const ping=(req,res)=>{
    res.status(200).send({message:"pong"})
}

const createTask=async (req,res)=>{
    const body={
        task_id:req.body.task_id,
        task_name:req.body.task_name
    };
    try{
        await taskModel.insertOne(body);
        res.status(201).send({message:"Task created"});
    }
    catch(err){
        console.log(err),
        res.status(400).send({message:"Insertion Failed"});
    }
}

const getTasks=async (req,res)=>{
    try{
        const taskList=await taskModel.find();
        res.status(200).send(taskList);
    }
    catch(err){
        res.status(400).send({message:"Could Not Fetch Tasks"});
    }
}

const deleteTask=async (req,res)=>{
    const id=req.params.id;
    try{
        await taskModel.findOneAndDelete({
            task_id:id
        });
        res.status(200).send({message:"Task Deleted Successfully"});
    }
    catch(err){
        res.status(400).send({message:"Failed To Delete Task"});
    }
}

module.exports={ping,createTask,getTasks,deleteTask};