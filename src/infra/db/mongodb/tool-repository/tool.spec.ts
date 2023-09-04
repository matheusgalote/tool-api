import { MongoHelper } from '../helpers/mongo-helper'
import { ToolMongoRepository } from './tool'
import type { AddToolModel } from '../../../../domain/usecases/add-tool'

const makeSut = (): ToolMongoRepository => {
  const sut = new ToolMongoRepository()
  return sut
}

const makeFakeData = (): AddToolModel => ({
  name: 'any_name',
  code: 'any_code',
  description: 'any_description'
})



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

  test('Should get an tool by code on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeData())
    const getTool = await sut.getToolByCode('any_code')
    expect(getTool).toBeTruthy()
  })

  test('Should return true if tool code already exists', async () => {
    const sut = makeSut()
    await sut.add(makeFakeData())
    const toolCodeAlreadyExists = await sut.toolCodeAlreadyExists('any_code')
    expect(toolCodeAlreadyExists).toBeTruthy()
  })

  test('Should return false if tool code not exists', async () => {
    const sut = makeSut()
    await sut.add(makeFakeData())
    const toolCodeAlreadyExists = await sut.toolCodeAlreadyExists('any_false_code')
    expect(toolCodeAlreadyExists).toBeFalsy()
  })
})
