import Input from "./Inputs"
import { useState } from "react"

function LogForm() {
    const [form, setform] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.email === "" 
            || form.password === "") {
            setErrors([
                "Please fill up every required fieds"
            ])
        } else {
            setErrors([]);
        }
    };

    const handlechange = (event) => {
        const { id, value } = event.target;
        setform({ ...form, [id]: value });
    };


    return (
        <div>
            <h2>Log in</h2>
            { errors.length > 0 && (
                <ul>
                    {errors.map((error, index) =>
                        <li key={index}>{error}</li> 
                    )}
                </ul>

            )}
            <form onSubmit={handleSubmit}>
                <Input label="Email:" type="email" id="email" value={form.email} onChange={handlechange} />
                <Input label="Password:" type="password" id="password" value={form.password} onChange={handlechange} />
                <button type="submit">Submit</button>
            </form>
            <div>
                <p>Don't have an account?</p>
                <p>create one</p>
            </div>

        </div>

    )
};

export default LogForm;