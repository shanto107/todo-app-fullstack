import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import config from "#src/config.js";
import { auth } from "#src/utils/auth/auth.js";

import { type DB } from "./db/index.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { createApiRouter } from "./routes/index.js";

export function createApp(db: DB) {
    const app = express();

    // security middlewares
    // cors policy needs to be updated before deployment
    app.use(
        cors({
            origin: config.auth.frontendUrl,
            credentials: true,
        }),
    );
    app.use(helmet());

    app.all("/api/auth/*splat", toNodeHandler(auth));

    // json parsing middleware
    app.use(express.json());

    // here rate limiter
    const apiRouter = createApiRouter(db);

    app.use("/api", apiRouter);

    app.use(errorHandler);

    return app;
}
