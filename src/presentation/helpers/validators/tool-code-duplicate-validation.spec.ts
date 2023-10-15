import type { ToolCodeAlreadyExistsRepository } from '../../../data/protocols/db/tool-code-already-exists-repository'
import type { HttpRequest } from '../../protocols/http'
import { ValidationParamError } from '../../errors/validation-param-error'
import { ToolCodeDuplicateValidation } from './tool-code-duplicate-validation'

const makeToolCodeAlreadyExistsRepository = (): ToolCodeAlreadyExistsRepository => {
  class ToolCodeAlreadyExistsRepositoryStub implements ToolCodeAlreadyExistsRepository {
    async toolCodeAlreadyExists (code: string): Promise<boolean> {
      return true
    }
  }

  return new ToolCodeAlreadyExistsRepositoryStub()
}

interface SutTypes {
  sut: ToolCodeDuplicateValidation
  toolCodeAlreadyExistsRepository: ToolCodeAlreadyExistsRepository
}

const makeSut = (): SutTypes => {
  const toolCodeAlreadyExistsRepository = makeToolCodeAlreadyExistsRepository()
  const sut = new ToolCodeDuplicateValidation(toolCodeAlreadyExistsRepository)
  return {
    sut,
    toolCodeAlreadyExistsRepository
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    code: 'any_code',
    description: 'any_description'
  }
})

describe('ToolCodeDuplicateValidation', () => {
  test('Should return a ValidationParamError if tool code already exists', async () => {
    const { sut } = makeSut()
    const error = await sut.validate(makeFakeRequest())
    expect(error).toEqual(new ValidationParamError('tool code already exists.'))
  })

  test('Should return null if tool not code exists', async () => {
    const { sut, toolCodeAlreadyExistsRepository } = makeSut()
    jest
      .spyOn(toolCodeAlreadyExistsRepository, 'toolCodeAlreadyExists')
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)))
    const error = await sut.validate(makeFakeRequest())
    expect(error).toBe(null)
  })
})
