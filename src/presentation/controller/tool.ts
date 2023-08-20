import { missingParamError } from '../helpers/http/http-helper'
import type { Controller } from '../protocols/contoller'
import type { HttpRequest, HttpResponse } from '../protocols/http'

export class ToolController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return missingParamError('name')
    }
    if (!httpRequest.body.code) {
      return missingParamError('code')
    }
    return null
  }
}
