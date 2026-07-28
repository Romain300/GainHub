import styles from "../styles/Input.module.css";

function Input({ label, type, name, id, onChange, value }) {

    return(
        <div className={styles.container}>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                className={styles.input}
                id={id}
                type={type}
                name={name}
                placeholder={label}
                value={value}
                onChange={onChange}
            />
        </div>
    )

};


export default Input;