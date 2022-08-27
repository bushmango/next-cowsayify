import { apiCowsGet } from './apiCowsGet-sidecar'
import { apiCowsHistory } from './apiCowsHistory-sidecar'
import { apiCowsSave } from './apiCowsSave-sidecar'
import { apiFortune } from './apiFortune-sidecar'
import { serverSideRenderRegister } from './serverSideRenderRegister'

let isRegistered = false
export function registerAll() {
  if (isRegistered) {
    return
  }
  isRegistered = true

  console.log('registering api routes')

  serverSideRenderRegister()

  apiCowsGet.register()
  apiCowsHistory.register()
  apiCowsSave.register()
  apiFortune.register()
}
