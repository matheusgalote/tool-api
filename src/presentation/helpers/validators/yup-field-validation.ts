import { object } from 'yup'
import { ValidationParamError } from '../../errors/validation-param-error'
import type { HttpRequest } from '../../protocols/http'
import type { Validation } from '../../protocols/validation'

export class YupFieldValidation implements Validation {
  private readonly requiredFields: any

  constructor (requiredFields: any) {
    this.requiredFields = requiredFields
  }

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
