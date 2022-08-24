import classesPrint from './Print.module.scss'
import Link from 'next/link'
import React from 'react'
import { l } from '../../common/lodash/lodash'
import classes from './CowsayifyLayout.module.scss'
import Head from 'next/head'
import { CowsayifyHeader } from './CowsayifyHeader'
import { cowsayifyLinks } from './cowsayifyLinks'

export const CowsayifyLayout = (props: {
  children: React.ReactNode
  title?: string
}) => {
  return (
    <>
      <Head>
        <title>{(props.title || 'Cowsay') + ' | Cowsayify.com'}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <CowsayifyHeader />
      <div className={classesPrint.notPrintable}>
        <div className={classes.links}>
          {l.map(cowsayifyLinks, (c) => {
            return (
              <div className={classes.link} key={c.href}>
                <Link href={'/' + c.href}>
                  <a>{c.text}</a>
                </Link>
              </div>
            )
          })}
        </div>
        <hr />
        <div className={classes.body}>{props.children}</div>
      </div>
    </>
  )
}
