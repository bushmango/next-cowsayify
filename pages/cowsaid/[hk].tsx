import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { CowsaidPage } from '../../components/cowsayify/CowsaidPage'

const Page: NextPage = () => {
  let router = useRouter()
  const { hk } = router.query as any
  return <CowsaidPage hk={hk} />
}

export default Page
