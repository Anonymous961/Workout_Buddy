import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const {dispatch}=useWorkoutsContext();
    const [title,setTitle]=useState('');
    const [load,setLoads]=useState('');
    const [reps,setReps]=useState('');
    const [error,setError]=useState(null);

    const handleSubmit=async (e)=>{
        e.preventDefault();

        const workout={title,load,reps};

        const response= await fetch("/api/workouts",{
            method: "POST",
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const json=await response.json();
        if(!response.ok){
            setError(json.error);
            console.log(error);
        }
        
        if(response.ok){
            setTitle('');
            setReps('');
            setLoads('');
            setError(null);
            console.log("new workout added",json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return (  
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Workout Title:</label>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} />
            <label>Loads(in kgs):</label>
            <input type="text" onChange={(e)=>setLoads(e.target.value)} value={load} />
            <label>Reps:</label>
            <input type="text" onChange={(e)=>setReps(e.target.value)} value={reps} />
            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
}
 
export default WorkoutForm;