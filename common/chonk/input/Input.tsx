import React from 'react'

import css from './Input.module.scss'

export const Input = (props: {
  round?: boolean
  value?: string
  onChange?: (newVal: string) => void
}) => {
  let className = css.input
  // if (props.round) {
  //   className += ' ' + css.round
  // }

  return (
    <input
      className={className}
      value={props.value}
      onChange={(ev) => {
        if (props.onChange) {
          props.onChange(ev.target.value)
        }
      }}
    />
  )
}
