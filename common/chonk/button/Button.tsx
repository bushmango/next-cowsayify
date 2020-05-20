import React from 'react'

import css from './Button.module.scss'

export const Button = (props: {
  children: React.ReactNode
  onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
  submit?: boolean
  round?: boolean
}) => {
  let className = css.button
  if (props.round) {
    className += ' ' + css.round
  }

  return (
    <button
      className={className}
      onClick={props.onClick}
      type={props.submit ? 'submit' : 'button'}
    >
      {props.children}
    </button>
  )
}
