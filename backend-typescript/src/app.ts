import express from "express";
import cors from "cors";
import helmet from "helmet";
import {createApiRouter} from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { type DB } from "./db/index.js";

export function createApp(db: DB) {
    
    const app = express();
    
    // security middlewares
    // cors policy needs to be updated before deployment
    app.use(cors());
    app.use(helmet());
    
    // json parsing middleware
    app.use(express.json());
    
    // here rate limiter
    const apiRouter = createApiRouter(db);
    
    app.use("/api", apiRouter);
    
    app.use(errorHandler);
    
    return app;
}
