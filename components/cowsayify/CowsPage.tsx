import { useAtom } from 'jotai'
import { l } from '../../common/lodash/lodash'
import { H1, Subheader } from '../form2/typography/Headers'
import { cowListAtom } from './CowListLoader'
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
  let [cowList] = useAtom(cowListAtom)

  return (
    <div>
      <H1>Cows</H1>
      <Subheader>These are the 'cows' you can use with cowsayify</Subheader>
      {l.map(cowList, (c) => (
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
