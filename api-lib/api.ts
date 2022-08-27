import { apiCowsGet } from './apiCowsGet-sidecar'
import { apiCowsHistory } from './apiCowsHistory-sidecar'
import { apiCowsSave } from './apiCowsSave-sidecar'
import AWS from 'aws-sdk'
import { apiFortune } from './apiFortune-sidecar'

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

export function serverSideRenderRegister() {
  AWS.config.update({
    region: process.env.APP_AWS_REGION,
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
  })
}
