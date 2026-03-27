import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, () => { 
    console.log(`The server is listening to PORT ${PORT}`) 
}).on('error', (err) => {
    console.log("Failed to start the server:", err.message)
})
