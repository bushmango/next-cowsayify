import * as React from 'react'

import { Layout } from '../layout/Layout'

export const AboutFull = () => {
  return (
    <Layout title='About'>
      <div>Fruit: {process.env.FRUIT}</div>
    </Layout>
  )
}
