import pool from "../db/db.js";

export async function getAllTasks(req, res) {
  try {
    const statement = `SELECT * FROM tasks`;
    const result = await pool.query(statement);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server Error!" });
  }
}

export async function addTask(req, res) {
  try {
    const { description, is_completed } = req.body;
    const statement = `INSERT INTO tasks (description, is_completed) VALUES ($1, $2) RETURNING *`;
    const params = [description, is_completed];
    const result = await pool.query(statement, params);
    console.log("----------ADD----------");
    console.log(result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server Error!" });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const statement = `DELETE FROM tasks WHERE id = $1`;
    const params = [id];
    const result = await pool.query(statement, params);
    console.log("----------DELETE----------");
    console.log(`Deleted task id = ${id}`);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server Error!" });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { is_completed } = req.body;
    const statement = `UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *`;
    const params = [is_completed, id];
    const result = await pool.query(statement, params);
    console.log("----------UPDATE-----------");
    console.log(result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server Error!" });
  }
}
