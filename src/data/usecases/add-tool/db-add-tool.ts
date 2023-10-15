import type { ToolModel } from '../../../domain/models/tool'
import type { AddTool, AddToolModel } from '../../../domain/usecases/add-tool'
import type { AddToolRepository } from '../../protocols/db/add-tool-repository'

export class DbAddTool implements AddTool {
  constructor (
    private readonly addToolRepository: AddToolRepository
  ) {}

  async add (toolData: AddToolModel): Promise<ToolModel> {
    const tool = await this.addToolRepository.add(toolData)

    return await new Promise(resolve => {
      resolve(tool)
    })
  }
}
