import { MongoHelper } from '../helpers/mongo-helper'
import { getMap } from './get-tool-mapper'
import { map } from './tool-mapper'
import type { AddToolRepository } from '../../../../data/protocols/db/add-tool-repository'
import type { ToolModel } from '../../../../domain/models/tool'
import type { AddToolModel } from '../../../../domain/usecases/add-tool'
import type { ToolCodeAlreadyExistsRepository } from '../../../../data/protocols/db/tool-code-already-exists-repository'

export class ToolMongoRepository implements AddToolRepository, ToolCodeAlreadyExistsRepository {
  async add (toolData: AddToolModel): Promise<ToolModel> {
    const toolCollection = await MongoHelper.getCollection('tools')
    const result = await toolCollection.insertOne(toolData)
    const tool = await map(toolCollection, result)
    return tool
  }

  async getToolByCode (code: string): Promise<ToolModel> {
    const toolCollection = await MongoHelper.getCollection('tools')
    const result = await toolCollection.findOne({ code })
    if (result) {
      const tool = await getMap(result)
      return tool
    }
    return null
  }

  async toolCodeAlreadyExists (code: string): Promise<boolean> {
    const toolCollection = await MongoHelper.getCollection('tools')
    const result = await toolCollection.findOne({ code })
    return !!result
  }
}
