import { ClassMiddlewares, MiddlewareError } from '@/types'
import { Request } from 'express'

export class LoadAPI implements ClassMiddlewares {
    async handle(req: Request): Promise<MiddlewareError> {
        try {
            req.apis = await new Promise((resolve, _reject) => {
                resolve([
                    { authenticated: true, enabled: true, key: "any_hash_git", prefix: '/github', url: 'https://github.com' },
                    { authenticated: true, enabled: false, key: "any_hash_agify", prefix: '/agify', url: 'https://api.agify.io' }
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