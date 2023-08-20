import type { Controller } from '../protocols/contoller'
import type { HttpRequest, HttpResponse } from '../protocols/http'

export class ToolController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 409,
        body: new Error()
      }
    }
    return null
  }
}
