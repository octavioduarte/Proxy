import { Request } from "express";
import { internalError, notFound } from "@/helpers";
import { APIType, ClassMiddlewares, HttpResponse } from "@/types";

export class LoadRoute implements ClassMiddlewares {
    async handle(req: Request): Promise<HttpResponse> {
        try {
            const prefix: string = req.url.split("/")[1]
            const apiProps: APIType = req.allServers.find(apis => apis.prefix === prefix && apis.enabled)

            if (!apiProps) {
                return notFound()
            }

            let slicesUrl: string[] | string = req.url.split("/")

            slicesUrl = slicesUrl
                .slice(2, slicesUrl.length)
                .join("/")

            req.api = { ...apiProps, url: `${apiProps.url}/${slicesUrl}` }

        } catch (error) {
            return internalError(error)
        }
    }
}