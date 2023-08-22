import type { ToolModel } from '../../domain/models/tool'
import type { AddToolModel } from '../../domain/usecases/add-tool'

export interface AddToolRepository {
  add (tool: AddToolModel): Promise<ToolModel>
}
