import cors from "cors";
import express from "express";
import helmet from "helmet";

import { type DB } from "./db/index.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { createApiRouter } from "./routes/index.js";

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
