import cowsay from 'cowsay-browser'
import React from 'react'

import styles from './DisplayCow.module.scss'
import { ICowOptions } from '@/state/cowsay'

export const DisplayCow = (props: { options: ICowOptions }) => {
  let { options } = props

  if (!options || !options.text) {
    options = {
      text: 'Whomp',
    } as any
  }

  return (
    <div className={styles.cowBox}>
      <pre>
        {options.action === 'think'
          ? cowsay.think(options)
          : cowsay.say(options)}
      </pre>
    </div>
  )
}
