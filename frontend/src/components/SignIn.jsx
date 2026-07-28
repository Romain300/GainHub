import Input from "./Inputs";
import styles from "../styles/Form.module.css";
import { useState } from "react";

function SignIn() {
    const [form, setForm] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        cpassword:""
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setForm({ ...form, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/signIn", {
                mode: "cors",
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: JSON.stringify(form),
            })

            const result = await response.json();

            if (!response.ok) {
                setErrors(result.errors);
                return;
            }

            console.log("User created", result.user);

        }catch (err) {
            console.error("Network error", err);
            setErrors([{ msg: "Network error, please try again later." }]);
        }
    };


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign In</h2>
            {errors.length > 0 && (
                <ul className={styles.errors}>
                    {errors.map((error, index) =>
                        <li key={index}>{error.msg}</li> 
                    )}
                </ul>
            )}
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input label="First Name:" type="text" id="firstname" value={form.firstname} onChange={handleChange}/>
                <Input label="Last Name:" type="text" id="lastname" value={form.lastname} onChange={handleChange}/>
                <Input label="Email:" type="email" id="email" value={form.email} onChange={handleChange}/>
                <Input label="Password:" type="password" id="password" value={form.password} onChange={handleChange}/>
                <Input label="Confirm Password:" type="password" id="cpassword" value={form.cpassword} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
};

export default SignIn;