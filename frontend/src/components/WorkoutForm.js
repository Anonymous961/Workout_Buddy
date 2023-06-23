import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoads] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("you must be logged in");
      return;
    }
    const workout = { title, load, reps };

    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/workouts",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);

      console.log(error);
    }

    if (response.ok) {
      setTitle("");
      setReps("");
      setLoads("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Workout Title:</label>
      <input
        type="text"
        className={emptyFields.includes("title") ? "error" : ""}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Loads(in kgs):</label>
      <input
        type="text"
        className={emptyFields.includes("loads") ? "error" : ""}
        onChange={(e) => setLoads(e.target.value)}
        value={load}
      />
      <label>Reps:</label>
      <input
        type="text"
        className={emptyFields.includes("reps") ? "error" : ""}
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
