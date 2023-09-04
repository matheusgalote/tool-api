import type { ToolModel } from '../../../../domain/models/tool'

export const getMap = async (toolData: any): Promise<ToolModel> => {
  const { _id, ...toolWithoutId } = toolData
  const tool = Object.assign(
    {},
    toolWithoutId,
    { id: _id.toHexString() }
  ) as ToolModel
  return tool
}
