import { YupFieldValidation } from '../../../presentation/helpers/validators/yup-field-validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeAddToolValidation } from './add-tool-validation'
import { addToolValidation } from '../../../presentation/helpers/validation-fields/add-tool'
import type { Validation } from '../../../presentation/protocols/validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('ToolValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddToolValidation()
    const validations: Validation[] = []
    validations.push(new YupFieldValidation(addToolValidation))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
