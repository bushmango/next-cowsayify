import React from 'react'

import css from './Link.module.scss'

export const Link = (props: { children: React.ReactNode }) => {
  let className = css.link
  // if (props.round) {
  //   className += ' ' + css.round
  // }

  return (
    <a href='#' className={className}>
      {props.children}
    </a>
  )
}
