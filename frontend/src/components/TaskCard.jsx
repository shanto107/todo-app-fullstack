import React from "react";

export default function TaskCard({ id, description, isCompleted, handleChecked, handleDelete }) {
    return (
        <div className="task-card">
            <div className="task-left">
                {isCompleted ?
                    <i
                        className="fa-regular fa-square-check"
                        onClick={() => handleChecked(id)}
                    ></i> :
                    <i 
                        className="fa-regular fa-square"
                        onClick={() => handleChecked(id)}
                    ></i>
                }
                <p className={isCompleted ? "completed": ""}>{description}</p>
            </div>
            <i
                className="fa-regular fa-trash-can task-delete"
                onClick={() => handleDelete(id)}
            ></i>
        </div>
    )
}