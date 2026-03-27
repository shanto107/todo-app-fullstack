import pool from "../db/db.js";

const tasks = [
    {
        description: "Workout",
        isCompleted: false,
    },
    {
        description: "Preparing lecture slide",
        isCompleted: false,
    },
    {
        description: "Meal prep",
        isCompleted: false,
    },
    {
        description: "Daily coding",
        isCompleted: true,
    },
    {
        description: "Gift shopping",
        isCompleted: false,
    },
]

try {
    let i = 1;
    for (const task of tasks) {
        await pool.query(
            `INSERT INTO tasks (description, is_completed) VALUES ($1, $2)`,
            [task.description, task.isCompleted]
        );
        console.log(`Entry done ${i++} done`)
    }
    console.log("Seeding Successful!")
}
catch(err) {
    console.log(err)
}
finally {
    await pool.end();
    console.log("DB Connection Closed");
}

