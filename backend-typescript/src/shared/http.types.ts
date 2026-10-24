import { Request } from "express";

export type TypedRequest<
    Params = {},
    Body = {},
    Query = {}
> = Request<
    Params,
    unknown,
    Body,
    Query
>;

