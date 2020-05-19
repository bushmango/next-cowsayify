import { useEffect } from 'react'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import { CowsayifyLayout } from './CowsayifyLayout'
import { DisplayCow } from './DisplayCow'

export const CowsaidPage = (props: { hk: string; prefetched?: any }) => {
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

export const Cowsaid = (props: { hk: string; prefetched?: any }) => {
  let { hk, prefetched } = props

  useEffect(() => {
    if (!prefetched) {
      sosCowsay.fetchCow(hk)
    }
  }, [hk])

  let state = sosCowsay.useSubscribe()
  let data = state.requestGetCow.response

  // let prefetched = getPrefetchedDataItem('cowsaidPage')
  if (prefetched) {
    // && prefetched[hk]) {
    data = prefetched.response // [hk]
  }

  let options = {} as any
  let text = ''
  if (data && data.item) {
    options = data.item.options
    options = JSON.parse(options || {})
  }

  text = options.text || ''

  if (!text) {
    text = 'Moooo..?'
  }

  if (state.requestGetCow.error) {
    text = '404 cow not found!'
    options = { d: true }
  } else if (state.requestGetCow.isFetching) {
    text = 'Loading...'
  } else if (!options) {
    text = 'Invalid cow!!'
    options = { d: true }
  }

  options.text = text
  return <DisplayCow options={options} />
}
