import type { AddToolRepository } from '../../../../data/protocols/db/add-tool-repository'
import type { ToolModel } from '../../../../domain/models/tool'
import type { AddToolModel } from '../../../../domain/usecases/add-tool'
import { MongoHelper } from '../helpers/mongo-helper'
import { map } from './account-mapper'

export class ToolMongoRepository implements AddToolRepository {
  async add (toolData: AddToolModel): Promise<ToolModel> {
    const toolCollection = await MongoHelper.getCollection('tools')
    const result = await toolCollection.insertOne(toolData)
    const tool = await map(toolCollection, result)
    return tool
  }
}
