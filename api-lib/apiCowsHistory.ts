import { postAnonymouslyJson } from '../common/api-lib/apiUtil'
import { dynamo } from '../common/dynamo/dynamo-sidecar'
import { log } from '../common/log/log'
import { razCowsay } from './dynamoCowsay'

// Build dynamo data!
export function register() {
  postAnonymouslyJson('/cows/history', async (req, _res) => {
    log('cows', 'history')

    let result = await dynamo.scan(
      razCowsay,
      null,
      'hk, options, createdDateTime',
    )

    return { isSuccess: true, result: result }
  })
}
