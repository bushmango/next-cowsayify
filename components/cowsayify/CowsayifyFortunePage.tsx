import { useEffect, useState } from 'react'

import { apiRequest } from '../../common/request/apiRequest-sidecar'
import { Button } from '../../next-core/form2/button/Button'
import { IApiRequestState } from '../state/sosCowsay'
import { CowsayifyLayout } from './CowsayifyLayout'
import { DisplayCow } from './DisplayCow'
const wrapText = require('wrap-text')

export const CowsayifyFortunePage = (props: {
  fromServer?: boolean
  serverStateHistory?: any
}) => {
  return (
    <CowsayifyLayout>
      <CowsayifyFortune {...props} />
    </CowsayifyLayout>
  )
}

export const CowsayifyFortune = (props: { serverStateHistory?: any }) => {
  let [fortune, setFortune] = useState<IApiRequestState<any>>({})
  let [fortuneId, setFortuneId] = useState(0)

  useEffect(() => {
    apiRequest.post<any>('/api/fortune/random', {}, (rs) => {
      setFortune(rs)
    })
  }, [fortuneId])

  let text = 'Casting the dice...'
  if (fortune.error) {
    text = 'Your future is unclear.'
  }
  if (fortune.isSuccess) {
    text = fortune.response.result
    text = text.trim()
    if (text.endsWith('\n') || text.endsWith('\r')) {
      text = text.substring(0, text.length - 1)
    }
    text = text.replace(/\t/g, '  ')

    // Wrap long lines
    let maxLineLength = 55
    // let lines = text.split('\n')
    // let finalLines: string[] = []
    // lines.forEach((line) => {
    //   while (line.length > maxLineLength) {
    //     let sub = line.substring(0, maxLineLength)
    //     finalLines.push(sub)
    //     line = line.substring(maxLineLength)
    //   }
    //   if (line.length > 0) {
    //     finalLines.push(line)
    //   }
    // })

    text = wrapText(text, maxLineLength)
  }

  return (
    <>
      <DisplayCow
        options={{
          action: '',
          text: text,
        }}
      />
      <div className='flex justify-center'>
        <Button
          spinning={fortune.isFetching}
          disabled={fortune.isFetching}
          onClick={() => {
            setFortuneId(fortuneId + 1)
          }}
        >
          Another!
        </Button>
      </div>
    </>
  )
}
