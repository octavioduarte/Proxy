import express, { Express, Request, Response } from 'express'
import { loadMiddleware, LoadAPIS, LoadRoute } from '@/middlewares'
import { env } from '@/config/env'
import { APIType } from './types'

const app = express()

env.HTTP_METHODS.forEach((method: keyof Express) => {
    app[method](
        "*",
        loadMiddleware(new LoadAPIS()),
        loadMiddleware(new LoadRoute()),
        async (req: Request, res: Response) => {
            console.log(req.body)
            res.json({ "api-found": req.api })
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