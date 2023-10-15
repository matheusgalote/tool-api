import type { Validation } from '../../protocols/validation'
import type { ToolCodeAlreadyExistsRepository } from '../../../data/protocols/db/tool-code-already-exists-repository'
import { ValidationParamError } from '../../errors/validation-param-error'

export class ToolCodeDuplicateValidation implements Validation {
  constructor (
    private readonly toolCodeAlreadyExistsRepository: ToolCodeAlreadyExistsRepository
  ) {}

  async validate (body: any): Promise<Error> {
    const codeExists = await this.toolCodeAlreadyExistsRepository.toolCodeAlreadyExists(body.code)
    if (codeExists) {
      return new ValidationParamError('tool code already exists.')
    }
    return null
  }
}
