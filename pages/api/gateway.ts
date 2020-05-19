import { NextApiRequest, NextApiResponse } from 'next'
import { apiGateway } from '../../common/api-lib/apiGateway-sidecar'
import { registerAll } from '../../api-lib/api'

export default (req: NextApiRequest, res: NextApiResponse) => {
  registerAll()
  return apiGateway.gateway(req, res)
}
