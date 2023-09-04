import { MongoHelper } from '../helpers/mongo-helper'
import { ToolMongoRepository } from './tool'

describe('Tool Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const toolCollection = await MongoHelper.getCollection('tools')
    await toolCollection.deleteMany({})
  })

  const makeSut = (): ToolMongoRepository => {
    const sut = new ToolMongoRepository()

    return sut
  }

  test('Should return an tool on success', async () => {
    const sut = makeSut()

    const tool = await sut.add({
      name: 'any_name',
      code: 'any_code',
      description: 'any_description'
    })

    expect(tool).toBeTruthy()
    expect(tool.id).toBeTruthy()
    expect(tool.name).toBe('any_name')
    expect(tool.code).toBe('any_code')
    expect(tool.description).toBe('any_description')
  })
})
