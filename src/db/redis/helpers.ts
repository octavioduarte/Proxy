import * as redis from 'redis'
import { env } from '@/config/env'


export class RedisHelper {
    redisClient: redis.RedisClient = redis.createClient({
        port: Number(env.DB.REDIS_PORT),
        host: env.DB.REDIS_HOST
    })


    async get(key: string) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, (err: Error, data) => {
                if (err) {
                    reject(err)
                }

                resolve(JSON.parse(data))
            })
        })
    }

    set(key: string, value: string) {
        return this.redisClient.set(key, value, (err: Error, data: string) => {
            if (err) {
                return err
            }

            return data
        })
    }
}