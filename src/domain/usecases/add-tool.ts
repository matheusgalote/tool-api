import type { ToolModel } from '../models/tool'

export interface AddToolModel {
  name: string
  code: string
  description: string
}

export interface AddTool {
  add (tool: AddToolModel): Promise<ToolModel>
}
