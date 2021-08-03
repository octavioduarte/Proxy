import { internalError, notFound } from "@/helpers/http";
import { APIType, ClassMiddlewares, HttpResponse } from "@/types";
import { Request } from "express";

export class LoadRoute implements ClassMiddlewares {
    async handle(req: Request): Promise<HttpResponse> {
        try {
            const prefix: string = req.url.split("/")[1]
            const apiProps: APIType = req.allServers.find(apis => apis.prefix === prefix)

            if (!apiProps) {
                return notFound()
            }

            let slicesUrl: string[] | string = req.url.split("/")

            slicesUrl = slicesUrl
                .slice(2, slicesUrl.length)
                .join("/")

            req.api = { ...apiProps, url: `${apiProps.url}/${slicesUrl}` }

        } catch {
            return internalError()
        }
    }
}