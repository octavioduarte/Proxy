import { Request } from 'express'
import { env } from '@/config/env'
import { internalError } from '@/helpers'
import { MongoHelper, RedisHelper } from '@/db'
import { APIType, ClassMiddlewares, HttpResponse } from '@/types'

export class LoadAPIS implements ClassMiddlewares {
    async handle(req: Request): Promise<HttpResponse> {

        try {
            const redisHelper = new RedisHelper()
            const serversRules: APIType[] = await redisHelper.get(env.DB.SERVERS_RULES_KEY) as APIType[]

            if (!serversRules) {
                const mongoHelper = new MongoHelper()
                await mongoHelper.connect(env.DB.MONGO_URI)
                const serversRulesCollection = await mongoHelper.getCollection('servers-rules')

                const result = await serversRulesCollection.find().toArray()
                redisHelper.set(env.DB.SERVERS_RULES_KEY, JSON.stringify(result))
                req.allServers = result as unknown as APIType[]
                await mongoHelper.disconnect()
            } else {
                req.allServers = serversRules
            }
        } catch (error) {
            return internalError(error)
        }
    }
}