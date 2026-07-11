import Input from "./Inputs";
import { useState } from "react";

function SignIn() {
    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setForm({ ...form, [id]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        for (const key in form) {
            if (form[key] === "") {
                setErrors([
                    "Please fill up every required fieds",
                ]);
                return;
            }
        }
    };


    return (
        <div>
            <h2>Sign In</h2>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, index) =>
                        <li key={index}>{error}</li> 
                    )}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <Input label="Name:" type="text" id="name" value={form.name} onChange={handleChange}/>
                <Input label="Email:" type="email" id="email" value={form.email} onChange={handleChange}/>
                <Input label="Password:" type="password" id="password" value={form.password} onChange={handleChange}/>
                <Input label="Confirm Password:" type="password" id="cpassword" value={form.cpassword} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
};

export default SignIn;