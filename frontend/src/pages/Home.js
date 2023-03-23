import {useState,useEffect} from 'react';

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
                {workouts && workouts.map((workout)=>[
                    <p key={workout._id}>{workout.title}</p>
                ])}
            </div>
        </div>
    );
}
 
export default Home;