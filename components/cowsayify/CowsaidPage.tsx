import { useEffect } from 'react'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import { CowsayifyLayout } from './CowsayifyLayout'
import { DisplayCow } from './DisplayCow'

export const CowsaidPage = (props: { hk: string }) => {
  return (
    <CowsayifyLayout>
      <Cowsaid {...props} />
    </CowsayifyLayout>
  )
}

// Cowsaid.getInitialProps = async ({ query }) => {
//   const { key } = query
//   return await minionCowsay.fetchCow(key)
// }

export const Cowsaid = (props: { hk: string }) => {
  let { hk } = props

  useEffect(() => {
    sosCowsay.fetchCow(hk)
  }, [hk])

  let state = sosCowsay.useSubscribe()
  let data = state.requestGetCow.response

  // let prefetched = getPrefetchedDataItem('cowsaidPage')
  // if (prefetched && prefetched[hk]) {
  //   data = prefetched[hk]
  // }

  let options = null as any
  let text = ''
  if (data && data.item) {
    options = data.item.options
    options = JSON.parse(options || {})
  }
  if (options) {
    text = options.text
  }

  if (!text) {
    text = 'Moooo..?'
  }

  if (state.requestGetCow.error) {
    text = '404 cow not found!'
    options = { d: true }
    options.text = text
  } else if (state.requestGetCow.isFetching) {
    text = 'Loading...'
  } else if (!options) {
    text = 'Invalid cow!!'
    options = { d: true }
    options.text = text
  } else {
    options = options
    options.text = text
  }

  return <DisplayCow options={options} />
}
