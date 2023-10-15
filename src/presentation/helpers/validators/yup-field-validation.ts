import type { HttpRequest } from '../../protocols/http'
import type { Validation } from '../../protocols/validation'
import { object } from 'yup'
import { ValidationParamError } from '../../errors/validation-param-error'

export class YupFieldValidation implements Validation {
  constructor (
    private readonly requiredFields: any
  ) {}

  async validate (body: HttpRequest): Promise<Error> {
    try {
      const fieldsToValidate = object(this.requiredFields)
      await fieldsToValidate.validate(body)
      return null
    } catch (error) {
      return new ValidationParamError(error.errors[0])
    }
  }
}
