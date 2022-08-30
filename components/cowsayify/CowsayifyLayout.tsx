import { useAtomValue } from 'jotai'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { darkmodeAtom } from '../../next-core/form2/DarkmodeToggle'
import { CowListLoader } from './CowListLoader'
import { CowsayifyHeader } from './CowsayifyHeader'
import classes from './CowsayifyLayout.module.scss'

// ' bg-white dark:bg-slate-800 '

export const CowsayifyLayout = (props: {
  children: React.ReactNode
  title?: string
}) => {
  const isDarkMode = useAtomValue(darkmodeAtom)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('bg-slate-800')
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('bg-slate-800')
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <>
      <Head>
        <title>{(props.title || 'Cowsay') + ' | Cowsayify.com'}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='dark:text-gray-400'>
        <CowsayifyHeader />
        <CowListLoader />

        <div className={classes.body}>{props.children}</div>
        {/* <div className={classesPrint.notPrintable}>
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
      </div> */}
      </div>
    </>
  )
}
