import axios, { Method } from 'axios'
import { internalError, ok } from "@/helpers";

export class HandleRequestController {
    async handle(url: string, method: string, body: any, headers: any) {
        try {
            const { data } = await axios({
                url,
                method: method as Method,
                data: body,
                headers
            })

            return ok(data)
        } catch {
            return internalError()
        }
    }
}