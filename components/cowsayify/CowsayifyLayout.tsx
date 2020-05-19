import classesPrint from './Print.module.scss'
import Link from 'next/link'
import React from 'react'
import { l } from '../../common/lodash/lodash'
import classes from './CowsayifyLayout.module.scss'

const links = [
  {
    link: 'make-the-cow-say-something',
    text: 'Make the cow say something',
  },
  {
    link: 'news',
    text: 'News',
  },
  {
    link: 'cows',
    text: 'Cows',
  },
  {
    link: 'about',
    text: 'About',
  },
  {
    link: 'history',
    text: 'History',
  },
]

export const CowsayifyLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className={classesPrint.notPrintable}>
      <div className={classes.links}>
        {l.map(links, (c) => {
          return (
            <div className={classes.link} key={c.link}>
              <Link href={'/' + c.link}>{c.text}</Link>
            </div>
          )
        })}
      </div>
      <hr />
      <div className={classes.body}>{props.children}</div>
    </div>
  )
}
