import { apiArguments } from '../common/api-lib/apiArguments-sidecar'
import { log } from '../common/log/log'
import { dynamo } from '../common/dynamo/dynamo-sidecar'
import { razCowsay } from './dynamoCowsay'
import { postAnonymouslyJson } from '../common/api-lib/apiUtil'

// Build dynamo data!
export function register() {
  postAnonymouslyJson('/cows/get', async (req, _res) => {
    const hk = apiArguments.getRequiredArgumentString(req, 'hk')
    let hkd = hk // decodeURIComponent(hk)

    log('cows', 'get', hkd)
    let result = await dynamo.get(razCowsay, hkd)
    log('cows', 'get', hkd)
    // logVerbose('cows', 'get', hkd, result)

    return { isSuccess: true, item: result.Item }
  })
}
