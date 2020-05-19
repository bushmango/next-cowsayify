import { apiArguments } from '../common/api-lib/apiArguments-sidecar'
import { log } from '../common/log/log'
import { dynamo } from '../common/dynamo/dynamo-sidecar'
import { razCowsay } from './dynamoCowsay'
import { postAnonymouslyJson } from '../common/api-lib/apiUtil'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

// Build dynamo data!
export function register() {
  postAnonymouslyJson('/cows/save', async (req, _res) => {
    log('cows', 'save')

    const options = apiArguments.getRequiredArgumentString(req, 'options')

    let hk = nanoid(10)

    let createdDateTime = DateTime.local().toISO()
    let item = {
      hk,
      options,
      createdDateTime,
    }

    let result = await dynamo.put(razCowsay, item)

    return { isSuccess: true, hk, result }
  })
}
