import React from 'react'

import { CowsayifyLayout } from './CowsayifyLayout'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import { CowsayOptions } from './CowsayOptions'
import { DisplayCow } from './DisplayCow'

export const CowsayPage = (props: any) => {
  return (
    <CowsayifyLayout title='Make the cow say something'>
      <Cowsay />
    </CowsayifyLayout>
  )
}

export const Cowsay = (props: any) => {
  const state = sosCowsay.useSubscribe()
  let options = sosCowsay.calcOptions()

  return (
    <div>
      <CowsayOptions state={state} />
      <DisplayCow options={options as any} />
    </div>
  )
}
