import { missingParamError, ok } from '../../helpers/http/http-helper'
import type { Controller } from '../../protocols/contoller'
import type { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddToolController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'code']
    for (const requiredField of requiredFields) {
      if (!httpRequest.body[requiredField]) {
        return missingParamError(requiredField)
      }
    }
    return ok(httpRequest)
  }
}
