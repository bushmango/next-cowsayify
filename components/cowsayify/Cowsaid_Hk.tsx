import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { CowsaidPage } from '../../components/cowsayify/CowsaidPage'

import { GetServerSideProps } from 'next'
import { serverSideRenderRegister } from '../../api-lib/api'
import { apiCowsGet } from '../../api-lib/apiCowsGet-sidecar'

export const Cowsaid_Hk_getServerSideProps: GetServerSideProps = async (
  context,
) => {
  try {
    const { hk } = context.params as any
    serverSideRenderRegister()
    let prefetched = await apiCowsGet.getCow(hk) // sosCowsay.prefetchCow(hk)
    console.log('prefetched', prefetched)
    return { props: { hk, prefetched } }
  } catch (err) {
    console.log(err)
    return {
      props: {
        hk: 'err',
        prefetched: {
          isSucess: false,
          item: { text: 'prefetch error ' + err },
        },
      },
    }
  }
}

export const Cowsaid_Hk: NextPage = (props: {
  hk?: string
  prefetched?: string
  children?: React.ReactNode
}) => {
  try {
    let router = useRouter()
    const { hk } = router.query as any
    return <CowsaidPage hk={hk} prefetched={props.prefetched} />
  } catch (err) {
    return <>Page error</>
  }
}
