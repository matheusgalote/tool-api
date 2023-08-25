import { addToolValidation } from '../../../presentation/helpers/validation-fields/add-tool'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { YupFieldValidation } from '../../../presentation/helpers/validators/yup-field-validation'
import type { Validation } from '../../../presentation/protocols/validation'

export const makeAddToolValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new YupFieldValidation(addToolValidation))
  return new ValidationComposite(validations)
}
