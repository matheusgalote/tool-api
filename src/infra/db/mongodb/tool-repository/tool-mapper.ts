import type { ToolModel } from '../../../../domain/models/tool'

export const map = async (toolCollection: any, result: any): Promise<ToolModel> => {
  const { insertedId: id } = result
  const toolById = await toolCollection.findOne({ _id: id })
  const { _id, ...toolWithoutId } = toolById
  const tool = Object.assign(
    {},
    toolWithoutId,
    { id: _id.toHexString() }
  ) as ToolModel
  return tool
}
