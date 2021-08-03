import { Express, Request, Response } from 'express'
import { APIType } from './types'
import { env } from '@/config/env'
import { loadAppSettings, loadMiddleware, LoadAPIS, LoadRoute } from '@/middlewares'


const app = loadAppSettings()

env.HTTP_METHODS.forEach((method: keyof Express) => {
    app[method](
        "*",
        loadMiddleware(new LoadAPIS()),
        loadMiddleware(new LoadRoute()),
        async (req: Request, res: Response) => {
            res.json({ "api-found": req.api, body: req.body })
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