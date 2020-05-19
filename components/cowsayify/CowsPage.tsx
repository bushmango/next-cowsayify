import React from 'react'
import { l } from '../../common/lodash/lodash'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import { CowsayifyLayout } from './CowsayifyLayout'
import { DisplayCow } from './DisplayCow'

export const CowsPage = () => {
  return (
    <CowsayifyLayout>
      <Cows />
    </CowsayifyLayout>
  )
}

export const Cows = () => {
  const cowsay = sosCowsay.useSubscribe()

  return (
    <div>
      <h1>Cows</h1>
      <h2>These are the 'cows' you can use with cowsayify</h2>
      {l.map(cowsay.cowList, (c) => (
        <div key={c}>
          {/* <div> {c} </div> */}
          <div>
            <DisplayCow options={{ text: c, f: c, action: 'say' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
