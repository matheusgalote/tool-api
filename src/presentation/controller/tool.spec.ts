import { ToolController } from './tool'
import type { HttpRequest } from '../protocols/http'

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
    console.log(error, '???')
    expect(error.body).toEqual(new Error())
    expect(error.statusCode).toBe(409)
  })
})
