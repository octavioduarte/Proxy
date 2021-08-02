import express, { Express, Request, Response } from 'express'
import { loadMiddleware, LoadAPI } from '@/middlewares'
import { env } from '@/config/env'

const app = express()

env.HTTP_METHODS.forEach((method: keyof Express) => {
    app[method](
        "*",
        loadMiddleware(new LoadAPI()),
        async (req: Request, res: Response) => res.json({ url: req.apis })
    )
})

app.listen(env.HTTP_PORT, () => { console.log(`Proxy running at port: ${env.HTTP_PORT}`) })


declare global {
    namespace Express {
        export interface Request {
            apis?: {
                authenticated: boolean
                enabled: boolean
                key: string
                prefix: string
                url: string
            }[]
        }
    }
}