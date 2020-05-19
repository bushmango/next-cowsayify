import React from 'react'
import { DisplayCow, CowsayOptions } from '.'
import { sosCowsay } from '@/state'
import { CowsayifyLayout } from './CowsayifyLayout'

export const CowsayPage = (props: any) => {
  return (
    <CowsayifyLayout>
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
