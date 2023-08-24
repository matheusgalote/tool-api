import { object } from 'yup'
import { ValidationParamError } from '../../errors/validation-param-error'
import type { FieldValidator } from '../../protocols/field-validator'
import type { HttpRequest } from '../../protocols/http'

export class YupFieldValidation implements FieldValidator {
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
