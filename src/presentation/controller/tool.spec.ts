import { ToolController } from './tool'
import type { HttpRequest } from '../protocols/http'
import { missingParamError, ok } from '../helpers/http/http-helper'

function makeFakeHttpRequest (): HttpRequest {
  return {
    body: {
      name: 'any_name',
      code: 'any_code',
      description: 'any_description'
    }
  }
}

describe('Tool Controller', () => {
  test('Should return error if validation name is not provided', async () => {
    const sut = new ToolController()
    const httpRequest: HttpRequest = {
      body: {
        code: 'any_code',
        description: 'any_description'
      }
    }
    const error = await sut.handle(httpRequest)
    const { body, statusCode } = missingParamError('name')
    expect(error.body).toEqual(body)
    expect(error.statusCode).toBe(statusCode)
  })

  test('Should return error if validation code is not provided', async () => {
    const sut = new ToolController()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description'
      }
    }
    const error = await sut.handle(httpRequest)
    const { body, statusCode } = missingParamError('code')
    expect(error.body).toEqual(body)
    expect(error.statusCode).toBe(statusCode)
  })

  test('Should return ok if all data is provided', async () => {
    const sut = new ToolController()
    const success = await sut.handle(makeFakeHttpRequest())
    expect(success).toEqual(ok(makeFakeHttpRequest()))
  })
})
