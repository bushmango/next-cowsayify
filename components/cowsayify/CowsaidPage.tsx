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
  try {
    const isPrefetched = prefetched && prefetched.isSuccess

    useEffect(() => {
      if (!isPrefetched) {
        sosCowsay.fetchCow(hk)
      }
    }, [hk])

    let state = sosCowsay.useSubscribe()
    let data = state.requestGetCow.response

    if (isPrefetched) {
      data = prefetched
    }

    let options = {} as any
    let text = ''
    if (data && data.item) {
      options = data.item.options
      options = JSON.parse(options || {})
    }

    console.log('prefetched', prefetched, data)

    text = options.text || ''

    if (!text) {
      text = 'Moooo..?'
      if (isPrefetched && !prefetched.item) {
        text = '404 cow not found!'
        options = { d: true }
      }
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
  } catch (err) {
    console.error(err)
    return <>Error</>
  }
}
