import { RazLink } from '@/components/RazLink'
import React from 'react'
import classes from './CowsayifyLayout.module.scss'
import classesPrint from '@/common/css/Print.module.scss'
import { _ } from '@/common/imports'
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
        {_.map(links, (c) => {
          return (
            <div className={classes.link} key={c.link}>
              <RazLink to={'/' + c.link}>{c.text}</RazLink>
            </div>
          )
        })}
      </div>
      <hr />
      <div className={classes.body}>{props.children}</div>
    </div>
  )
}
