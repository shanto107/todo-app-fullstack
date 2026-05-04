import React, { ChangeEvent } from "react";

export type InputProps = {
    input: string;
    setInput: (value: string) => void;
}

export default function InputField({ input, setInput }: InputProps) {

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInput(event.currentTarget.value);
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