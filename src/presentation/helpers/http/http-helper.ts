import { MissingParamError } from '../../errors/missing-param-error'
import { ServerError } from '../../errors/server-error'
import type { HttpResponse } from '../../protocols/http'

export function missingParamError (param: any): HttpResponse {
  return {
    statusCode: 409,
    body: new MissingParamError(param)
  }
}

export function ok (data: any): HttpResponse {
  return {
    statusCode: 201,
    body: data
  }
}

export function serverError (error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}
