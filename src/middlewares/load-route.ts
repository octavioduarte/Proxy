import { APIType, ClassMiddlewares, MiddlewareError } from "@/types";
import { Request } from "express";

export class LoadRoute implements ClassMiddlewares {
    async handle(req: Request): Promise<MiddlewareError> {
        try {
            const prefix: string = req.url.split("/")[1]


            if (!prefix) {
                return {
                    message: 'Invalid route',
                    status: 400
                }
            }

            let apiProps: APIType = req.allServers.find(apis => apis.prefix === prefix)

            if (!apiProps) {
                return {
                    message: 'Invalid route',
                    status: 400
                }
            }

            let slicesUrl: string[] | string = req.url.split("/")

            slicesUrl = slicesUrl
                .slice(2, slicesUrl.length)
                .join("/")

            req.api = { ...apiProps, url: `${apiProps.url}/${slicesUrl}` }

        } catch {
            return {
                message: 'Internal Error',
                status: 500
            }
        }
    }
}