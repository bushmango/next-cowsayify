import React from 'react'

import css from './Input.module.scss'

export const Input = (props: { round?: boolean }) => {
  let className = css.input
  // if (props.round) {
  //   className += ' ' + css.round
  // }

  return <input className={className}></input>
}
