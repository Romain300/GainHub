import Input from "./Inputs"
import styles from "../styles/Form.module.css";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import { Select } from "./Inputs";
import { v4 as uuidv4 } from "uuid";

function NewWorkout() {
    // const [user, token] = useAuth();
    const [errors, setErrors] = useState([]);
    const [listExercises, setListExercises] = useState([]);
    const [form, setform] = useState({
        name:"",
        exercises:[],
        date:"",
    });
    const [selectedExercise, setSelectedExercise] = useState("");


    useEffect(() => {
        const fetchExercises = async() => {
            try{
                const response = await fetch("http://localhost:8000/exercises", {
                    mode: "cors",
                    headers: { "Content-type": "application/json" }
                });

                const result = await response.json();

                if (!response.ok) {
                    setErrors([{ msg: result.errorMessage }]);
                    return;
                }

                setListExercises(result.exercises);
            
                return;
            }catch (err){
                console.error("Network error", err);
                setErrors([{ msg: "Network error, please try again later." }]);
            }
        };

        fetchExercises();
    }, []);

    const handleChange = (event) => {
        const { id, value, name } = event.target;
        //distinction made to set up sets 
        if (id !== "") {
            setform({ ...form, [id]: value });
        } else {
            const idExercise = Number(event.target.dataset.idexercise);
            const idSet = event.target.dataset.idset;

            const updatedExercises = form.exercises.map((ex) => {
                if (ex.id === idExercise) {

                    const updatedSets = ex.sets.map((set) => {
                        if (set.id === idSet) {
                            set = {
                                ...set,
                                [name]: value
                            };
                        }
                        return set;
                    });

                    ex = {
                        ...ex,
                        sets: updatedSets
                    };
                }
                return ex;
            });
            setform({ ...form, exercises: updatedExercises});
        }
    };

    const handleSelectChange = (event) => {
        const id = event.target.value;
        setSelectedExercise(id);
    };

    const getAvailableExercises = () => {
        const exercisesInUsed = form.exercises.map((ex) => ex.id);

        const availableExercises = listExercises.filter(
            (ex) => !exercisesInUsed.includes(ex.id)
        );

        return availableExercises;
    };

    const addExercise = () => {
        const id = selectedExercise;
        if (id === "") {
            return;
        }
        let newExercise = listExercises.find((ex) => ex.id ===Number(id));
        newExercise = { ...newExercise, sets: [] };
        setform({ 
            ...form, 
            exercises: [...form.exercises, newExercise]
        });

    };

    const removeExercise = (event) => {
        const id = Number(event.currentTarget.dataset.id);
        const updatedExercises = form.exercises.filter(ex => ex.id !== id);
        setform({ ...form, exercises: updatedExercises });
        console.log("hello",updatedExercises)
    };

    const addSet = (event) => {
        const id = Number(event.currentTarget.dataset.id);
        const updatedExercises = form.exercises.map((ex) => {
            if (ex.id === id) {
                ex = {
                    ...ex,
                    sets: [...ex.sets, { weight: "", reps: "", id: uuidv4() }]
                };
            }
            return ex;
        });

        setform({
            ...form,
            exercises: updatedExercises
        });
    };

    const removesSet = (event) => {
        const idExrecise = Number(event.currentTarget.dataset.idexercise);
        const idSet = event.currentTarget.dataset.idset;

        const updatedExercises = form.exercises.map((ex) => {
            if (ex.id === idExrecise) {
                ex = {
                    ...ex,
                    sets: ex.sets.filter((set) => set.id !==idSet),
                };
            }

            return ex;
        });

        setform({
            ...form,
            exercises: updatedExercises
        });
        
    };

    return (

        <div className={styles.container}>
            <h2 className={styles.title}>New Workout</h2>
            { errors.length > 0 && (
                <ul className={styles.errors}>
                    {errors.map((error, index) =>
                        <li key={index}>{error.msg}</li> 
                    )}
                </ul>
            )}
            <form className={styles.form}>
                <Input placeholder="Workout Name" label="Workout Name:" type="text" id="name" value={form.name} onChange={handleChange}/>
                <Input label="Date:" type="date" id="date" value={form.date} onChange={handleChange}/>

                <div className={styles.selectExercise}>
                    <Select
                        onChange={handleSelectChange} 
                        label="Add Exercise:" 
                        name="exercise" 
                        id="exercise" 
                        options={getAvailableExercises()}
                        placeholder="--Select an exercise"
                        value={selectedExercise}
                    />
                    <button onClick={addExercise} type="button">Add</button>
                </div>

                {form.exercises.length > 0 && (
                    <div className={styles.exerciseList}>

                        {form.exercises.map((exercise) => 
                            <div key={exercise.id} className={styles.exerciseCard}>
                                <div className={styles.exerciseHeader}>
                                    <div className={styles.exerciseName}>{exercise.name}</div>
                                    <button className={styles.removeButton} onClick={removeExercise} data-id={exercise.id} type="button">Remove</button>
                                </div>

                                <div className={styles.setsContainer}>
                                    <table className={styles.setsTable}>
                                        <thead>
                                            <tr>
                                                <th>Set</th>
                                                <th>Weight</th>
                                                <th>Reps</th>
                                            </tr>
                                        </thead>

                                        { exercise.sets.length > 0 && (
                                            <tbody>
                                                {exercise.sets.map((set, index) =>
                                                    <tr key={set.id}>
                                                        <td>{index+1}</td>
                                                        <td><Input name="weight" data-idset={set.id} data-idexercise={exercise.id} value={set.weight} step="0.5" type="number" onChange={handleChange}/></td>
                                                        <td><Input name="reps" data-idset={set.id} data-idexercise={exercise.id} value={set.reps} step="1" type="number" onChange={handleChange}/></td>
                                                        <td><button data-idset={set.id} data-idexercise={exercise.id} className={styles.removeSetButton} onClick={removesSet} type="button">×</button></td>
                                                    </tr> 
                                                )}
                                            </tbody>
                                        )}   

                                    </table>
                                    <button className={styles.addSetButton} onClick={addSet} data-id={exercise.id} type="button">Add Set</button>  
                                </div>

                            </div>
                        )}

                    </div>
                )}

                
            </form>
            
        </div>

    )
};

export default NewWorkout;


//add order