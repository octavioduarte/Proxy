import { ClassMiddlewares } from "@/types"
import { NextFunction, Request, Response } from "express"


export const loadMiddleware = (middlewareInstance: ClassMiddlewares) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const error = await middlewareInstance.handle(req)
            if (error) {
                const { status, message } = error
                return res.status(status)
                    .send({
                        message,
                        has_error: true
                    })
            }
            next()
        } catch {
            return res.status(500)
                .send({
                    message: 'Internal error',
                    has_error: true
                })
        }
    }
}