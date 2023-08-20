import { ToolController } from './tool'
import type { HttpRequest } from '../protocols/http'
import { missingParamError } from '../helpers/http/http-helper'

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
})
