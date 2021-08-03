import { Request } from 'express'
import { internalError } from '@/helpers'
import { ClassMiddlewares, HttpResponse } from '@/types'

export class LoadAPIS implements ClassMiddlewares {
    async handle(req: Request): Promise<HttpResponse> {
        try {
            req.allServers = await new Promise((resolve, _reject) => {
                resolve([
                    { authenticated: true, enabled: true, key: "any_hash_git", prefix: 'github', url: 'https://api.github.com' },
                    { authenticated: true, enabled: true, key: "any_hash_agify", prefix: 'agify', url: 'https://api.agify.io' }
                ])
            })
        } catch (error) {
            return internalError(error)
        }
    }
}