import React from 'react'
import { CowsayifyLayout } from './CowsayifyLayout'
import { DisplayCow } from './DisplayCow'

const news = [
  'May 19, 2020\nUpdated and moved to NextJs / Vercel!',
  'Mar 04, 2019\nAdded immer and state management support!',
  'Feb 22, 2019\nAdded different cows!',
  'Feb 22, 2019\nAdded history',
  'Feb 18, 2019\nAdded friendly urls, eyes, tongue, and the ability to think!',
  'Feb 17, 2019\nLaunched the cow',
]

export const CowsayifyNewsPage = () => {
  return (
    <CowsayifyLayout>
      <CowsayifyNews />
    </CowsayifyLayout>
  )
}

export const CowsayifyNews = (props: any) => {
  return (
    <div>
      <h1>Cowsayify news!</h1>
      {news.map((newsItem, cIdx) => (
        <DisplayCow
          key={cIdx}
          options={{
            text: newsItem,
            action: 'say',
          }}
        />
      ))}
    </div>
  )
}
