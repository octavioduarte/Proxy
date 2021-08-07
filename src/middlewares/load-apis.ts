import { Request } from 'express'
import { internalError } from '@/helpers'
import { APIType, ClassMiddlewares, HttpResponse } from '@/types'
import { MongoHelper } from '@/db'
import { env } from '@/config/env'

export class LoadAPIS implements ClassMiddlewares {
    async handle(req: Request): Promise<HttpResponse> {
        try {
            const mongoHelper = new MongoHelper()
            await mongoHelper.connect(env.DB.MONGO_URI)
            const serversRulesCollection = await mongoHelper.getCollection('servers-rules')
                        
            req.allServers = await serversRulesCollection.find().toArray() as unknown as APIType[]
            await mongoHelper.disconnect()
        } catch (error) {
            return internalError(error)
        }
    }
}