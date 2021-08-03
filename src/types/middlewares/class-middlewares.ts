import { Request } from "express";
import { HttpResponse } from "../http";

export interface ClassMiddlewares {
    handle: (req: Request) => Promise<HttpResponse>
}