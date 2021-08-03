import axios, { Method } from 'axios'
import { internalError, ok } from "@/helpers";
import { Controller, HttpResponse } from '@/types';

export class HandleRequestController implements Controller {
    async handle(props: HandleRequestController.Props): Promise<HttpResponse> {
        const { body, url, method, headers } = props
        try {
            const { data } = await axios({
                url,
                method: method as Method,
                data: body,
                headers
            })

            return ok(data)
        } catch (error){
            return internalError(error)
        }
    }
}

export namespace HandleRequestController {
    export type Props = {
        body: any
        headers: any
        method: string
        url: string
    }
}