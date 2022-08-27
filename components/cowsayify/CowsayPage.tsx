import React from 'react'

import { CowsayifyLayout } from './CowsayifyLayout'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import { CowsayOptions } from './CowsayOptions'
import { DisplayCow } from './DisplayCow'
import { useAtom } from 'jotai'
import { cowOptionsAtom } from '../state/cowsay'
import { CowListLoader } from './CowListLoader'

export const CowsayPage = (props: any) => {
  return (
    <CowsayifyLayout title='Make the cow say something'>
      <Cowsay />
    </CowsayifyLayout>
  )
}

export const Cowsay = (props: any) => {
  let [cowOptions] = useAtom(cowOptionsAtom)
  let options = sosCowsay.calcOptions(cowOptions)

  return (
    <div>
      <CowsayOptions />
      <DisplayCow options={options as any} />
    </div>
  )
}
