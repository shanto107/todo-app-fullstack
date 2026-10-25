import type { Request } from "express";

export type TypedRequest<
    Params = Record<string, never>,
    Body = unknown,
    Query = Record<string, never>,
> = Request<Params, unknown, Body, Query>;
