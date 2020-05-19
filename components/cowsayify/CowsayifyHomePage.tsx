import React from 'react'
import { Helmet } from 'react-helmet'

import { CowsayifyLayout } from '.'

export const CowsayifyHomePage = (props: { children: React.ReactNode }) => {
  return (
    <CowsayifyLayout>
      <Helmet>
        <title>Cowsayify</title>
        <meta name='description' content='Razzle coffee application' />
      </Helmet>
      This is the coffee page, hello
    </CowsayifyLayout>
  )
}
