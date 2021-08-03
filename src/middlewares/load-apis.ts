import { ClassMiddlewares, MiddlewareError } from '@/types'
import { Request } from 'express'

export class LoadAPIS implements ClassMiddlewares {
    async handle(req: Request): Promise<MiddlewareError> {
        try {
            req.allServers = await new Promise((resolve, _reject) => {
                resolve([
                    { authenticated: true, enabled: true, key: "any_hash_git", prefix: 'github', url: 'https://api.github.com' },
                    { authenticated: true, enabled: false, key: "any_hash_agify", prefix: 'agify', url: 'https://api.agify.io' }
                ])
            })
        } catch {
            return {
                message: 'Internal Error',
                status: 500
            }
        }
    }
}