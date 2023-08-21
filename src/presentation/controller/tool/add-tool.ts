import { missingParamError, ok, serverError } from '../../helpers/http/http-helper'
import type { Controller } from '../../protocols/contoller'
import type { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddToolController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'code']
      for (const requiredField of requiredFields) {
        if (!httpRequest.body[requiredField]) {
          return missingParamError(requiredField)
        }
      }
      return ok(httpRequest)
    } catch (error) {
      serverError(error)
    }
  }
}
