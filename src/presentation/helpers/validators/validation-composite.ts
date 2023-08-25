import type { HttpRequest } from '../../protocols/http'
import type { Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate ({ body }: HttpRequest): Error | Promise<Error> {
    for (const validation of this.validations) {
      const error = validation.validate(body)

      if (error) {
        return error
      }
    }
  }
}
