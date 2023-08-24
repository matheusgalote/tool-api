import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import type { AddTool } from '../../../domain/usecases/add-tool'
import type { Controller } from '../../protocols/contoller'
import type { FieldValidator } from '../../protocols/field-validator'
import type { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddToolController implements Controller {
  private readonly addTool: AddTool
  private readonly fieldValidation: FieldValidator

  constructor (addTool: AddTool, fieldValidation: FieldValidator) {
    this.addTool = addTool
    this.fieldValidation = fieldValidation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.fieldValidation.validate(httpRequest.body)
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
