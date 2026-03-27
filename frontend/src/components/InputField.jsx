import React from "react";

export default function InputField({ input, setInput }) {

    function handleChange(event) {
        setInput(event.target.value);
    }

    return (
        <div className="input-container">
            <input
                type="text"
                placeholder="write down a task..."
                name="task"
                onChange={handleChange}
                value={input}
            />
        </div>
    )
}