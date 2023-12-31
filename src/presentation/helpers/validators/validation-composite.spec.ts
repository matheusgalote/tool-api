import type { Validation } from '../../protocols/validation'
import type { HttpRequest } from '../../protocols/http'
import { ValidationParamError } from '../../errors/validation-param-error'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate ({ body }: HttpRequest): Error {
      return null
    }
  }

  return new ValidationStub()
}

interface ISut {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): ISut => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    field: 'any_value'
  }
})

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new ValidationParamError('field'))
    const error = await sut.validate(makeFakeRequest())
    expect(error).toEqual(new ValidationParamError('field'))
  })

  test('Should return the first error if more then one validation fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new ValidationParamError('field'))
    const error = await sut.validate(makeFakeRequest())
    expect(error).toEqual(new Error())
  })

  test('Should return anything if validation succeed', async () => {
    const { sut } = makeSut()
    const error = await sut.validate(makeFakeRequest().body)
    expect(error).toBeFalsy()
  })
})
