import styles from "../styles/Input.module.css";

function Input({ label, type, name, id, onChange, value , placeholder, step, ...props }) {

    return(
        <div className={styles.container}>
            { label && (
                <label htmlFor={id}>
                    {label}
                </label>
            )}
            
            <input
                className={styles.input}
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                step={step}
                {...props}
            />
        </div>
    )

};

export function Select({ label, name, id, options, placeholder, onChange, value }) {
    return (
        <div className={styles.container}>
            <label htmlFor={id}>
                {label}
            </label>
            <select className={styles.select} name={name} id={id} onChange={onChange} value={value}>
                <option value="">{placeholder}</option>
                {options.map((option) =>
                    <option key={option.id} value={option.id}>{option.name}</option> 
                )}
            </select>
        </div>
    )
}


export default Input;