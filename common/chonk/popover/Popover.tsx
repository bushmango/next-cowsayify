import css from './Popover.module.scss'
import React from 'react'

export const Popover = (props: {
  children: React.ReactNode
  content: () => React.ReactNode
  position: 'bottom' | 'top'
  isOpen: boolean
}) => {
  let positionClass = ' ' + css.top
  if (props.position === 'bottom') {
    positionClass = ' ' + css.bottom
  }

  return (
    <div className={css.container}>
      <div>{props.children}</div>
      {props.isOpen && (
        <div className={css.content + positionClass}>{props.content()}</div>
      )}
    </div>
  )
}
