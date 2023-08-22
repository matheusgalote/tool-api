import type { ToolModel } from '../../../domain/models/tool'
import type { AddTool, AddToolModel } from '../../../domain/usecases/add-tool'
import type { AddToolRepository } from '../../protocols/db/add-tool-repository'

export class DbAddTool implements AddTool {
  private readonly addToolRepository: AddToolRepository

  constructor (addToolRepository: AddToolRepository) {
    this.addToolRepository = addToolRepository
  }

  async add (toolData: AddToolModel): Promise<ToolModel> {
    const tool = await this.addToolRepository.add(toolData)

    return await new Promise(resolve => {
      resolve(tool)
    })
  }
}
