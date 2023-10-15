import type { AddTool, Controller, Validation, HttpRequest, HttpResponse } from './add-tool-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

export class AddToolController implements Controller {
  constructor (
    private readonly addTool: AddTool,
    private readonly validation: Validation
  ) {}

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
