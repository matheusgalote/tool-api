import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = sut.getCollection('tools')
    expect(accountCollection).toBeTruthy()
    accountCollection = sut.getCollection('tools')
    expect(accountCollection).toBeTruthy()
  })
})
