import { type Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeAddToolController } from '../../../main/factories/tool/add/add-tool'

export default (router: Router): void => {
  router.post('/tool', adaptRoute(makeAddToolController()))
}
