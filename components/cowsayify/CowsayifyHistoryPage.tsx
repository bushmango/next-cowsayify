import css from './CowsayifyHistoryPage.module.scss'
import { CowsayifyLayout } from './CowsayifyLayout'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import { useEffect } from 'react'
import l from 'lodash'
import { DateTime } from 'luxon'
import { DisplayCow } from './DisplayCow'
import { Loader } from './Loader'

interface IDataListItem {
  text: string
  action: string
}
interface IDataList {
  Items: []
  Count: number
  ScannedCount: number
}

export const CowsayifyHistoryPage = (props: {
  fromServer?: boolean
  serverStateHistory?: any
}) => {
  return (
    <CowsayifyLayout>
      <CowsayifyHistory {...props} />
    </CowsayifyLayout>
  )
}

// History.getInitialProps = async ({ req }) => {
//   const fromServer = !!req
//   await minionHistory.fetchHistory()
//   return {
//     serverStateHistory: minionHistory.dehydrate(fromServer),
//   }
// }

export const CowsayifyHistory = (props: { serverStateHistory?: any }) => {
  // minionHistory.rehydrate(props.serverStateHistory)
  // const history = minionHistory.useSubscribe()
  // let { fetchedHistory } = history

  useEffect(() => {
    sosCowsay.fetchHistory()
  }, [])

  const state = sosCowsay.useSubscribe()
  let { requestGetHistory } = state

  // console.log('fetched history', requestGetHistory)

  if (!requestGetHistory || !requestGetHistory.response) {
    return (
      <div>
        <Loader />
      </div>
    )
  } else if (requestGetHistory.error) {
    return <div>Error</div>
  }

  let items: {
    createdDateTime?: string
    options?: any
    //text?: string
  }[] = l.map(requestGetHistory.response.result.Items, (c) => {
    try {
      return {
        createdDateTime: c.createdDateTime || '',
        options: JSON.parse(c.options),
      }
    } catch (err) {
      return { text: 'JSON error' }
    }
  })

  items = l.sortBy(items, ['createdDateTime']).reverse()

  return (
    <div>
      <h1>Messages sent with cowsayify</h1>
      <div className={css.pageHistory}>
        {l.map(items, (c, cIdx) => (
          <div key={cIdx}>
            {/* item{c.text} {c.action} */}
            <div className={css.date}>
              {c.createdDateTime
                ? DateTime.fromISO(c.createdDateTime).toLocaleString(
                    DateTime.DATETIME_MED,
                  )
                : 'Before history'}
            </div>
            <DisplayCow options={c.options} />
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}
