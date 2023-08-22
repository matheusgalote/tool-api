import { type AddTool } from '../../../domain/usecases/add-tool'
import { missingParamError, ok, serverError } from '../../helpers/http/http-helper'
import type { Controller } from '../../protocols/contoller'
import type { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddToolController implements Controller {
  private readonly addTool: AddTool

  constructor (addTool: AddTool) {
    this.addTool = addTool
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'code']
      for (const requiredField of requiredFields) {
        if (!httpRequest.body[requiredField]) {
          return missingParamError(requiredField)
        }
      }
      const { name, code, description } = httpRequest.body

      await this.addTool.add({
        name,
        code,
        description
      })

      return ok(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }
}
