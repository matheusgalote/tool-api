import { DbAddTool } from '../../../data/usecases/add-tool/db-add-tool'
import { ToolMongoRepository } from '../../../infra/db/mongodb/tool-repository/tool'
import { AddToolController } from '../../../presentation/controller/tool/add-tool'
import { addToolValidation } from '../../../presentation/helpers/validation-fields/add-tool'
import { YupFieldValidation } from '../../../presentation/helpers/validators/yup-field-validation'
import type { Controller } from '../../../presentation/protocols/contoller'

export const makeAddToolController = (): Controller => {
  const fieldValidator = new YupFieldValidation(addToolValidation)
  const toolMongoRepository = new ToolMongoRepository()
  const dbAddTool = new DbAddTool(toolMongoRepository)

  return new AddToolController(dbAddTool, fieldValidator)
}
