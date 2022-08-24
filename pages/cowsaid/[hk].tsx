import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { CowsaidPage } from '../../components/cowsayify/CowsaidPage'

import { GetServerSideProps } from 'next'
import { apiCowsGet } from '../../api-lib/apiCowsGet-sidecar'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { hk } = context.params as any
  let prefetched = await apiCowsGet.getCow(hk) // sosCowsay.prefetchCow(hk)
  console.log('prefetched', prefetched)
  return { props: { hk, prefetched } }
}

const Page: NextPage = (props: {
  hk?: string
  prefetched?: string
  children?: React.ReactNode
}) => {
  let router = useRouter()
  const { hk } = router.query as any
  return <CowsaidPage hk={hk} prefetched={props.prefetched} />
}

export default Page
