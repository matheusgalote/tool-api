import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddToolController } from '../factories/tool/add/add-tool'
import type { Router } from 'express'

export default (router: Router): void => {
  router.post('/tool', adaptRoute(makeAddToolController()))
}
