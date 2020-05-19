import { Error404 } from '@/common/components'
import React from 'react'
import { Route, Switch } from 'react-router'

import {
  CowsaidPage,
  CowsayifyAboutPage,
  CowsayifyHistoryPage,
  CowsayifyHomePage,
  CowsayifyLayout,
  CowsayifyNewsPage,
  CowsayPage,
  CowsPage,
} from '.'

const Page404 = () => {
  return (
    <CowsayifyLayout>
      <Error404 />
    </CowsayifyLayout>
  )
}

export const CowsayRoutes = () => {
  return (
    <Switch>
      <Route exact={true} path='/' component={CowsayPage} />
      <Route exact={true} path='/home' component={CowsayifyHomePage} />
      <Route
        exact={true}
        path='/make-the-cow-say-something'
        component={CowsayPage}
      />
      <Route exact={true} path='/history' component={CowsayifyHistoryPage} />
      <Route
        exact={true}
        path='/cowsaid/:hk?'
        component={({ match }) => <CowsaidPage hk={match.params.hk} />}
      />
      <Route exact={true} path='/cows' component={CowsPage} />
      <Route exact={true} path='/news' component={CowsayifyNewsPage} />
      <Route exact={true} path='/about' component={CowsayifyAboutPage} />
      <Route component={Page404} />
    </Switch>
  )
}
