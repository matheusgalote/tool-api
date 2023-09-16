import { addToolValidation } from '../../../../presentation/helpers/validation-fields/tool/add-tool'
import ToolCodeDuplicateValidation from '../../../../presentation/helpers/validators/tool-code-duplicate-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validation-composite'
import { YupFieldValidation } from '../../../../presentation/helpers/validators/yup-field-validation'
import type { ToolCodeAlreadyExistsRepository } from '../../../../data/protocols/db/tool-code-already-exists-repository'
import type { Validation } from '../../../../presentation/protocols/validation'

export const makeAddToolValidation = (toolCodeAlreadyExistsRepository: ToolCodeAlreadyExistsRepository): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new YupFieldValidation(addToolValidation))
  validations.push(new ToolCodeDuplicateValidation(toolCodeAlreadyExistsRepository))
  return new ValidationComposite(validations)
}
