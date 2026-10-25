import os from "node:os";

import { NextFunction,Request, Response } from "express";

import config from "../../config.js";

const startedAt = new Date().toISOString();

export function handleHealthCheck(
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    const checks = {
        app: "ok",
        // db check
    };
    // calculating if db and api service is ok or not.
    const allHealthy = Object.values(checks).every((value) => value === "ok");

    // calculating uptime
    const uptimeSeconds = Math.floor(process.uptime());
    const uptime = `${Math.floor(uptimeSeconds / 3600)} Hour ${Math.floor((uptimeSeconds % 3600) / 60)} mins ${uptimeSeconds % 60} sec`;

    const responseBody = {
        status: allHealthy ? "ok" : "degraded",
        environment: config.api.platform,
        timestamp: new Date().toISOString(),
        startedAt: startedAt,
        uptime: uptime,
        system: {
            hostname: os.hostname(),
            platform: os.platform(),
            nodeVersion: process.version,
            pid: process.pid,
        },
    };
    res.status(allHealthy ? 200 : 503).json(responseBody);
}

export function handleLiveCheck(
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
}
