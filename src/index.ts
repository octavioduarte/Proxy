import { Express, Request, Response } from 'express'
import { APIType, HttpResponse } from './types'
import { env } from '@/config/env'
import { HandleRequestController } from '@/presentation'
import { loadAppSettings, loadMiddleware, LoadAPIS, LoadRoute } from '@/middlewares'
import { MongoHelper } from '@/db'

const app = loadAppSettings()

env.HTTP_METHODS.forEach((method: keyof Express) => {
    app[method](
        "*",
        loadMiddleware(new LoadAPIS()),
        loadMiddleware(new LoadRoute()),
        async (req: Request, res: Response) => {

            const { body, headers, method, api } = req

            const handleRequestController = new HandleRequestController()
            const httpResponse: HttpResponse = await handleRequestController.handle({ body, headers, method, url: api.url })

            res.status(httpResponse.statusCode).json({ data: httpResponse.data, has_error: httpResponse.has_error })
        }
    )
})


declare global {
    namespace Express {
        export interface Request {
            allServers?: APIType[],
            api?: APIType
        }
    }
}


new MongoHelper()
    .connect(env.DB.MONGO_URI)
    .then(() => {
        console.info("Database connection established")
    })
    .then(() => {
        app.listen(env.HTTP_PORT, () => {
            console.info(`Proxy running at port: ${env.HTTP_PORT}`)
        })
    })
    .catch((error) => {
        console.error(`Database connection failed: ${error}`)
    })

