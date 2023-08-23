import { MongoHelper } from '../helpers/mongo-helper'
import { ToolMongoRepository } from './tool'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): ToolMongoRepository => {
    const sut = new ToolMongoRepository()

    return sut
  }

  test('Should return an tool on success', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'any_name',
      code: 'any_code',
      description: 'any_description'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.code).toBe('any_code')
    expect(account.description).toBe('any_description')
  })
})
