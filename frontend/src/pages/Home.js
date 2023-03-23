import {useState,useEffect} from 'react';

//components
import WorkoutDetails from '../components/WorkoutDetauils';
const Home = () => {
    const [workouts,setWorkouts]=useState(null);

    useEffect(()=>{
        const fetchWorkout=async ()=>{
            const res= await fetch("/api/workouts");
            const json=await res.json();

            if(res.ok){
                setWorkouts(json);
            }
        }
        fetchWorkout();
    },[])
    return ( 
        <div className="Home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
        </div>
    );
}
 
export default Home;