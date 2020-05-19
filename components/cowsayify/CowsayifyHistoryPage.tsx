import styles from './CowsayifyHistoryPage.module.scss'

import React, { useEffect } from 'react'
import { _, DateTime } from '@/common/imports'
import { CowsayifyLayout } from './CowsayifyLayout'
import { sosCowsay } from '@/state'
import { DisplayCow } from '.'
import { Loader } from '@/common/components/loader'

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
  }[] = _.map(requestGetHistory.response.result.Items, (c) => {
    try {
      return {
        createdDateTime: c.createdDateTime || '',
        options: JSON.parse(c.options),
      }
    } catch (err) {
      return { text: 'JSON error' }
    }
  })

  items = _.sortBy(items, ['createdDateTime']).reverse()

  return (
    <div>
      <h1>Messages sent with cowsayify</h1>
      <div className={styles.pageHistory}>
        {_.map(items, (c, cIdx) => (
          <div key={cIdx}>
            {/* item{c.text} {c.action} */}
            <div className={styles.date}>
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
