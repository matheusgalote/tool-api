import { DbAddTool } from './db-add-tool'
import type { ToolModel } from '../../../domain/models/tool'
import type { AddToolModel } from '../../../domain/usecases/add-tool'
import type { AddToolRepository } from '../../protocols/db/add-tool-repository'

const makeFakeTool = (): ToolModel => ({
  id: 'valid_id',
  name: 'valid_name',
  code: 'valid_code',
  description: 'valid_description'
})

const makeFakeToolData = (): AddToolModel => ({
  name: 'any_name',
  code: 'any_code',
  description: 'any_description'
})

const makeAddToolRepository = (): AddToolRepository => {
  class AddToolRepositoryStub implements AddToolRepository {
    async add (toolData: AddToolModel): Promise<ToolModel> {
      return await new Promise((resolve) => resolve(makeFakeTool()))
    }
  }

  return new AddToolRepositoryStub()
}

interface ISut {
  sut: DbAddTool
  addToolRepositoryStub: AddToolRepository
}

const makeSut = (): ISut => {
  const addToolRepositoryStub = makeAddToolRepository()
  const sut = new DbAddTool(addToolRepositoryStub)

  return {
    sut,
    addToolRepositoryStub
  }
}

describe('DbAddTool UseCase', () => {
  test('Should be call AddToolRepository with correct values', async () => {
    const { sut, addToolRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addToolRepositoryStub, 'add')
    await sut.add(makeFakeToolData())
    expect(addSpy).toBeCalledWith({
      name: 'any_name',
      code: 'any_code',
      description: 'any_description'
    })
  })

  test('Should throws if AddToolRepository throws', async () => {
    const { sut, addToolRepositoryStub } = makeSut()
    jest
      .spyOn(addToolRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeToolData())
    await expect(promise).rejects.toThrow()
  })

  test('Should be return an tool on success', async () => {
    const { sut } = makeSut()
    const tool = await sut.add(makeFakeToolData())
    expect(tool).toEqual(makeFakeTool())
  })
})
