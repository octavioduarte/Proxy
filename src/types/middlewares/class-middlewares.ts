import { Request } from "express";
import { MiddlewareError } from "./error";

export interface ClassMiddlewares {
    handle: (req: Request) => Promise<MiddlewareError>
}