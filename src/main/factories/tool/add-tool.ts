import { AddToolController } from '../../../presentation/controller/tool/add-tool'
import type { Controller } from '../../../presentation/protocols/contoller'

export const makeAddToolController = (): Controller => {
  return new AddToolController()
}
