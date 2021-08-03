import { NextFunction, Request, Response } from "express"
import { ClassMiddlewares } from "@/types"
import { internalError } from "@/helpers/http"



export const loadMiddleware = (middlewareInstance: ClassMiddlewares) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> => {
        try {
            const error = await middlewareInstance.handle(req)
            if (error) {
                const { data, has_error, statusCode } = error
                return res.status(statusCode).json({ has_error, data })
            }
            next()
        } catch {
            const { data, has_error, statusCode } = internalError()
            res.status(statusCode).send({ has_error, data })
        }
    }
}