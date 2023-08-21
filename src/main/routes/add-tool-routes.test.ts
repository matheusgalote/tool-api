import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Tool Routes', () => {
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

  test('Should be create a tool on success', async () => {
    await request(app)
      .post('/api/tool')
      .send({
        name: 'MANÔMETRO',
        code: '#99934',
        description: 'NEW TOOL'
      })
      .expect(201)
  })
})
