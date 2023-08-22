import { AddToolController } from './add-tool'
import { missingParamError, ok, serverError } from '../../helpers/http/http-helper'
import type { HttpRequest } from '../../protocols/http'
import type { AddToolModel, AddTool } from '../../../domain/usecases/add-tool'
import type { ToolModel } from '../../../domain/models/tool'
import { ServerError } from '../../errors/server-error'

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    body: {
      name: 'any_name',
      code: 'any_code',
      description: 'any_description'
    }
  }
}

const makeFakeTool = (): ToolModel => ({
  id: 'valid_id',
  name: 'valid_name',
  code: 'valid_code',
  description: 'valid_description'
})

const makeAddToolStub = (): AddTool => {
  class AddToolStub implements AddTool {
    async add (tool: AddToolModel): Promise<ToolModel> {
      return await new Promise(resolve => resolve(makeFakeTool()))
    }
  }

  return new AddToolStub()
}

interface ISut {
  sut: AddToolController
  addToolStub: AddTool
}

const makeSut = (): ISut => {
  const addToolStub = makeAddToolStub()
  const sut = new AddToolController(addToolStub)

  return {
    sut,
    addToolStub
  }
}

describe('AddTool Controller', () => {
  test('Should return error if validation name is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        code: 'any_code',
        description: 'any_description'
      }
    }
    const error = await sut.handle(httpRequest)
    expect(error).toEqual(missingParamError('name'))
  })

  test('Should return error if validation code is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description'
      }
    }
    const error = await sut.handle(httpRequest)
    expect(error).toEqual(missingParamError('code'))
  })

  test('Should return ok if all data is provided', async () => {
    const { sut } = makeSut()
    const success = await sut.handle(makeFakeHttpRequest())
    expect(success).toEqual(ok(makeFakeHttpRequest()))
  })

  test('Should be call AddTool with correct values', async () => {
    const { sut, addToolStub } = makeSut()
    const addSpy = jest.spyOn(addToolStub, 'add')
    await sut.handle(makeFakeHttpRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      code: 'any_code',
      description: 'any_description'
    })
  })

  test('Should be return a serverError if AddTool throws', async () => {
    const { sut, addToolStub } = makeSut()
    jest
      .spyOn(addToolStub, 'add')
      .mockImplementationOnce(async () => {
        return await new Promise((resolve, reject) => reject(new Error()))
      })
    const error = await sut.handle(makeFakeHttpRequest())
    expect(error).toEqual(serverError(new ServerError(null)))
  })
})
