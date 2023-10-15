import type { Validation } from '../../../../presentation/protocols/validation'
import type { ToolCodeAlreadyExistsRepository } from '../../../../data/protocols/db/tool-code-already-exists-repository'
import { YupFieldValidation } from '../../../../presentation/helpers/validators/yup-field-validation'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validation-composite'
import { makeAddToolValidation } from './add-tool-validation'
import { addToolValidation } from '../../../../presentation/helpers/validation-fields/tool/add-tool'
import { ToolCodeDuplicateValidation } from '../../../../presentation/helpers/validators/tool-code-duplicate-validation'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

const makeToolCodeAlreadyExistsRepository = (): ToolCodeAlreadyExistsRepository => {
  class ToolCodeAlreadyExistsRepositoryStub implements ToolCodeAlreadyExistsRepository {
    async toolCodeAlreadyExists (code: string): Promise<boolean> {
      return true
    }
  }
  return new ToolCodeAlreadyExistsRepositoryStub()
}

describe('ToolValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddToolValidation(makeToolCodeAlreadyExistsRepository())
    const validations: Validation[] = []
    validations.push(new YupFieldValidation(addToolValidation))
    validations.push(new ToolCodeDuplicateValidation(makeToolCodeAlreadyExistsRepository()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
