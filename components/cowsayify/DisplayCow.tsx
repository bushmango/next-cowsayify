// import cowsay from 'cowsay-browser'
const cowsay = require('cowsay-browser')

import React from 'react'
import { ICowOptions } from '../state/cowsay'
import css from './DisplayCow.module.scss'

export const DisplayCow = (props: { options: ICowOptions }) => {
  let { options } = props

  if (!options || !options.text) {
    options = {
      text: 'Whomp',
    } as any
  }

  return (
    <div className={css.cowBox}>
      <pre>
        {options.action === 'think'
          ? cowsay.think(options)
          : cowsay.say(options)}
      </pre>
    </div>
  )
}
