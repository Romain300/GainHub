import Input from "./Inputs";
import styles from "../styles/Form.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "./useAuth";


function LogForm() {
    const [form, setform] = useState({
        email: "",
        password: ""
    });

    const auth = useAuth();

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/logIn", {
                mode: "cors",
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(form)
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(result.errors);
                return;
            }

            auth.login(result.token, result.user);
            console.log("user logged In", result.user);
            
        }catch (err) {
            console.error("Network error", err);
            setErrors([{ msg: "Network error, please try again later" }]);
        }

    };

    const handlechange = (event) => {
        const { id, value } = event.target;
        setform({ ...form, [id]: value });
    };


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Log in</h2>
            { errors.length > 0 && (
                <ul className={styles.errors}>
                    {errors.map((error, index) =>
                        <li key={index}>{error.msg}</li> 
                    )}
                </ul>

            )}
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input placeholder="Email" label="Email:" type="email" id="email" value={form.email} onChange={handlechange} />
                <Input placeholder="Password" label="Password:" type="password" id="password" value={form.password} onChange={handlechange} />
                <button type="submit">Submit</button>
            </form>
            <div className={styles.links}>
                <p>Don't have an account?</p>
                <Link className={styles.link} to="signIn">Create one</Link>
            </div>

        </div>

    )
};

export default LogForm;

