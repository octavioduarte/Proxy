import { HttpResponse } from '@/types/http'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
