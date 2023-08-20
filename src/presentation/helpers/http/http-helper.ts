import { MissingParamError } from '../../errors/missing-param-error'
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
