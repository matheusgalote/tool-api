import type { AddToolModel } from '../../../domain/usecases/add-tool'

export interface ToolCodeAlreadyExistsRepository {
  toolCodeAlreadyExists (tool: AddToolModel): Promise<boolean>
}
