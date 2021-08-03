import { HTTPStatus } from "./http-status"
import { HttpResponse } from '@/types'


export const badRequest = (error: string) => ({
    has_error: true,
    statusCode: HTTPStatus.BAD_REQUEST,
    data: error
})

export const forbidden = (error: string) => ({
    has_error: true,
    statusCode: HTTPStatus.FORBIDDEN,
    data: error
})

export const unauthorized = (): HttpResponse => ({
    statusCode: HTTPStatus.UNAUTHORIZED,
    has_error: true,
    data: 'Unauthorized'
})

export const internalError = (): HttpResponse => ({
    statusCode: HTTPStatus.INTERNAL_ERROR,
    has_error: true,
    data: 'Internal Error'
})

export const noContent = (): HttpResponse => ({
    statusCode: HTTPStatus.NO_CONTENT,
    has_error: false,
    data: null
})

export const ok = (data: any): HttpResponse => ({
    statusCode: HTTPStatus.OK,
    has_error: false,
    data
})

export const notFound = (): HttpResponse => ({
    statusCode: HTTPStatus.NOT_FOUND,
    has_error: true,
    data: 'Route not found'
})