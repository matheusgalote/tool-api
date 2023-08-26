import type { ToolCodeAlreadyExistsRepository } from '../../../data/protocols/db/tool-code-already-exists-repository'
import { ValidationParamError } from '../../errors/validation-param-error'
import type { HttpRequest } from '../../protocols/http'
import type { Validation } from '../../protocols/validation'

export default class ToolCodeDuplicateValidation implements Validation {
  private readonly toolCodeAlreadyExistsRepository: ToolCodeAlreadyExistsRepository

  constructor (toolCodeAlreadyExistsRepository: ToolCodeAlreadyExistsRepository) {
    this.toolCodeAlreadyExistsRepository = toolCodeAlreadyExistsRepository
  }

  async validate ({ body }: HttpRequest): Promise<Error> {
    const codeExists = await this.toolCodeAlreadyExistsRepository.toolCodeAlreadyExists(body.code)
    if (codeExists) {
      return new ValidationParamError('tool code already exists.')
    }
    return null
  }
}
