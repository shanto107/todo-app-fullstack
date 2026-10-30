import { asc } from "drizzle-orm";
import { Router } from "express";
import { NextFunction, Request, Response } from "express";

import { db } from "#src/db/index.js";
import { designations } from "#src/db/schema/designations.js";
import { sendSuccess } from "#src/shared/http-response.js";

const router = Router();

router.get(
    "/designations",
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await db
                .select({
                    id: designations.id,
                    name: designations.name,
                    code: designations.code,
                })
                .from(designations)
                .orderBy(asc(designations.name));

            sendSuccess(
                res,
                200,
                "DESIGNATION_FETCHED",
                "Designations fetched successfully.",
                result,
            );
        } catch (error) {
            next(error);
        }
    },
);

export default router;
