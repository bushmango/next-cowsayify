import { postAnonymouslyJson } from '../common/api-lib/apiUtil'
import { log } from '../common/log/log'

const randomFortune = require('random-fortune')

// Build dynamo data!
export function register() {
  postAnonymouslyJson('/fortune/random', async (req, _res) => {
    log('fortune', 'random')
    const fortune = randomFortune.fortune()
    return { isSuccess: true, result: fortune }
  })
}
