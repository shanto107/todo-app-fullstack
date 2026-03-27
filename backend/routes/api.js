import express from "express";
import { addTask, getAllTasks, deleteTask, updateTask } from "../controllers/apiControllers.js";

const apiRouter = express.Router();

apiRouter.get("/tasks", getAllTasks);
apiRouter.post("/tasks", addTask);
apiRouter.delete("/tasks/:id", deleteTask);
apiRouter.patch("/tasks/:id", updateTask)

export default apiRouter;


