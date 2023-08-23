import type { ToolModel } from '../../../../domain/models/tool'

export const map = async (accountCollection: any, result: any): Promise<ToolModel> => {
  const { insertedId: id } = result
  const accountById = await accountCollection.findOne({ _id: id })
  const { _id, ...accountWithoutId } = accountById
  const account = Object.assign(
    {},
    accountWithoutId,
    { id: _id.toHexString() }
  ) as ToolModel

  return account
}
