function Input({ label, type, name, id, onChange, value }) {

    return(
        <div>
            <label htmlFor={id}>
                {label}
            </label>
            <input
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