import l from 'lodash'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { H1 } from '../form2/typography/Headers'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import css from './CowsayifyHistoryPage.module.scss'
import { CowsayifyLayout } from './CowsayifyLayout'
import { DisplayCow } from './DisplayCow'
import { Loader } from './Loader'

// interface IDataListItem {
//   text: string
//   action: string
// }
// interface IDataList {
//   Items: []
//   Count: number
//   ScannedCount: number
// }

export const CowsayifyHistoryPage = (props: {
  fromServer?: boolean
  serverStateHistory?: any
}) => {
  return (
    <CowsayifyLayout>
      <CowsayifyHistoryContainer {...props} />
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

export const CowsayifyHistoryContainer = (props: {
  serverStateHistory?: any
}) => {
  return (
    <div>
      <H1>Messages sent with cowsayify</H1>
      <div className={css.pageHistory}>
        <CowsayifyHistory serverStateHistory={props.serverStateHistory} />
      </div>
    </div>
  )
}

export const CowsayifyHistory = (props: { serverStateHistory?: any }) => {
  useEffect(() => {
    sosCowsay.fetchHistory()
  }, [])

  const state = sosCowsay.useSubscribe()
  let { requestGetHistory } = state

  if (!requestGetHistory || !requestGetHistory.response) {
    return <Loader />
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
    <>
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
    </>
  )
}
