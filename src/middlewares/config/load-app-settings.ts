import express, { Express, json } from 'express'
import cors from 'cors'

export const loadAppSettings = (): Express => {
    const app: Express = express()
    app.use(cors())
    app.use(json())

    return app
}