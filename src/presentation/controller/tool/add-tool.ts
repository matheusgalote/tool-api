import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import type { AddTool } from '../../../domain/usecases/add-tool'
import type { Controller } from '../../protocols/contoller'
import type { Validation } from '../../protocols/validation'
import type { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddToolController implements Controller {
  private readonly addTool: AddTool
  private readonly validation: Validation

  constructor (addTool: AddTool, validation: Validation) {
    this.addTool = addTool
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
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
