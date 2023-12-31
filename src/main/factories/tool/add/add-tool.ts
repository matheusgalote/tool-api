import type { Controller } from '../../../../presentation/protocols/contoller'
import { DbAddTool } from '../../../../data/usecases/add-tool/db-add-tool'
import { ToolMongoRepository } from '../../../../infra/db/mongodb/tool-repository/tool'
import { AddToolController } from '../../../../presentation/controller/tool/add-tool'
import { makeAddToolValidation } from './add-tool-validation'

export const makeAddToolController = (): Controller => {
  const toolMongoRepository = new ToolMongoRepository()
  const dbAddTool = new DbAddTool(toolMongoRepository)

  return new AddToolController(dbAddTool, makeAddToolValidation(toolMongoRepository))
}
