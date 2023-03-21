const express=require('express');
const {
    createWorkout,
    getWorkouts
}=require('../controllers/workoutController');

const router=express.Router();


//Get all workouts
router.get("/",getWorkouts);

//Get a single workout
router.get("/:id",(req,res)=>{
    res.json({mssg:"Get a single workout!"});
})

//Post a new workout
router.post("/",createWorkout);

//Delete a workout
router.delete("/:id",(req,res)=>{
    res.json({mssg:"Delete a new workout!"});
})

//Update a workout
router.patch("/:id",(req,res)=>{
    res.json({mssg:"Update a workout!"});
})


module.exports=router;