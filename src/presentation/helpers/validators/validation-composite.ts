import type { HttpRequest } from '../../protocols/http'
import type { Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  async validate (body: HttpRequest): Promise<Error> {
    for (const validation of this.validations) {
      const error = await validation.validate(body)

      if (error) {
        return error
      }
    }
  }
}
