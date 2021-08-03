import { Request } from "express";
import { HttpResponse } from "@/types/http";

export interface ClassMiddlewares {
    handle: (req: Request) => Promise<HttpResponse>
}