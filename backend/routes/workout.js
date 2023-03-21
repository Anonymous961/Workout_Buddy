const express=require('express');
const Workout = require('../models/workoutModel');

const router=express.Router();


//Get all workouts
router.get("/",(req,res)=>{
    res.json({mssg:"Get all workouts!"});
})

//Get a single workout
router.get("/:id",(req,res)=>{
    res.json({mssg:"Get a single workout!"});
})

//Post a new workout
router.post("/",(req,res)=>{
    const {title, reps,load }= req.body;

    try{
        const workout=Workout.create(title,reps,load);
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error: error.message});
    }
    res.json({mssg:"Post a new workout!"});
})

//Delete a workout
router.delete("/:id",(req,res)=>{
    res.json({mssg:"Delete a new workout!"});
})

//Update a workout
router.patch("/:id",(req,res)=>{
    res.json({mssg:"Update a workout!"});
})


module.exports=router;