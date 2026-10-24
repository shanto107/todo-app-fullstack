import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

type ValidationSchemas = {
    body?: ZodType;
    params?: ZodType;
    query?: ZodType;
};

export function validationHandler(schemas: ValidationSchemas) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (schemas.params) {
            req.params = schemas.params.parse(req.params) as typeof req.params;
        }

        if (schemas.query) {
            res.locals.query = schemas.query.parse(req.query);
        }

        if (schemas.body) {
            req.body = schemas.body.parse(req.body) as typeof req.body;
        }

        next();
    };
}
