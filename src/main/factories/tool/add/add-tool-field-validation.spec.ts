import type { HttpRequest } from '../../../../presentation/protocols/http'
import { YupFieldValidation } from '../../../../presentation/helpers/validators/yup-field-validation'
import { addToolValidation } from '../../../../presentation/helpers/validation-fields/tool/add-tool'
import { ValidationParamError } from '../../../../presentation/errors/validation-param-error'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    code: 'any_code',
    description: 'any_description'
  }
})

const makeFieldLength = (length: number): string => {
  return 'x'.repeat(length)
}

describe('YupFieldValidation', () => {
  test('Should return a ValidationParamError if name is not provided', async () => {
    const sut = new YupFieldValidation(addToolValidation)
    const fakeRequest: HttpRequest = {
      body: {
        code: 'any_code'
      }
    }
    const error = await sut.validate(fakeRequest.body)
    expect(error).toEqual(new ValidationParamError('name is a required field'))
  })

  test('Should return a ValidationParamError if code is not provided', async () => {
    const sut = new YupFieldValidation(addToolValidation)
    const fakeRequest: HttpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const error = await sut.validate(fakeRequest.body)
    expect(error).toEqual(new ValidationParamError('code is a required field'))
  })

  test('Should return a string with correct length', () => {
    const string = makeFieldLength(10)
    expect(string).toHaveLength(10)
  })

  test('Should return a ValidationParamError if code is has more than 255 characters', async () => {
    const sut = new YupFieldValidation(addToolValidation)
    const fakeRequest: HttpRequest = {
      body: {
        name: makeFieldLength(256),
        code: 'any_code'
      }
    }
    const error = await sut.validate(fakeRequest.body)
    expect(error).toEqual(new ValidationParamError('name must be at most 255 characters'))
  })

  test('Should return a ValidationParamError if code is has more than 255 characters', async () => {
    const sut = new YupFieldValidation(addToolValidation)
    const fakeRequest: HttpRequest = {
      body: {
        name: 'any_name',
        code: makeFieldLength(256)
      }
    }
    const error = await sut.validate(fakeRequest.body)
    expect(error).toEqual(new ValidationParamError('code must be at most 255 characters'))
  })

  test('Should return a ValidationParamError if description is has more than 255 characters', async () => {
    const sut = new YupFieldValidation(addToolValidation)
    const fakeRequest: HttpRequest = {
      body: {
        name: 'any_name',
        code: 'any_code',
        description: makeFieldLength(2001)
      }
    }
    const error = await sut.validate(fakeRequest.body)
    expect(error).toEqual(new ValidationParamError('description must be at most 2000 characters'))
  })

  test('Should return null if all required params is provided', async () => {
    const sut = new YupFieldValidation(addToolValidation)
    const error = await sut.validate(makeFakeRequest().body)
    expect(error).toBeNull()
  })
})
