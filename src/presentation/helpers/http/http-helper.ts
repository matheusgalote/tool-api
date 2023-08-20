import { MissingParamError } from '../../errors/missing-param-error'
import type { HttpResponse } from '../../protocols/http'

export function missingParamError (param: any): HttpResponse {
  return {
    statusCode: 409,
    body: new MissingParamError(param)
  }
}
