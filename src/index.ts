import { Express, Request, Response } from 'express'
import { APIType } from './types'
import { env } from '@/config/env'
import { HandleRequestController } from '@/presentation'
import { loadAppSettings, loadMiddleware, LoadAPIS, LoadRoute } from '@/middlewares'


const app = loadAppSettings()

env.HTTP_METHODS.forEach((method: keyof Express) => {
    app[method](
        "*",
        loadMiddleware(new LoadAPIS()),
        loadMiddleware(new LoadRoute()),
        async (req: Request, res: Response) => {
            const handleRequestController = new HandleRequestController()
            const { data, statusCode, has_error } = await handleRequestController.handle(req.api.url, req.method, req.body, "")

            res
                .status(statusCode)
                .json({ data, has_error })
        }
    )
})

app.listen(env.HTTP_PORT, () => { console.log(`Proxy running at port: ${env.HTTP_PORT}`) })


declare global {
    namespace Express {
        export interface Request {
            allServers?: APIType[],
            api?: APIType
        }
    }
}