import { Request, Response, NextFunction } from "express";
import os, { platform } from "node:os";
import config from "../../config.js";

const startedAt = new Date().toISOString();

export async function handleHealthCheck(req: Request, res: Response, next: NextFunction): Promise<void> {
    const checks = {
        app: "ok",
        // db check
    }
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
            pid: process.pid
        }
    };
    res.status(allHealthy ? 200 : 503).json(responseBody);
}

export function handleLiveCheck(req: Request, res: Response, next: NextFunction): void {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
    })
};
