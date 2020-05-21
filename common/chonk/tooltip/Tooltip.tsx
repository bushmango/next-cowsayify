import css from './Tooltip.module.scss'
import React from 'react'
import { Popover } from '../popover/Popover'

export const Tooltip = (props: {
  children: React.ReactNode
  content: () => React.ReactNode
  position: 'bottom' | 'top'
}) => {
  let [isOpen, setIsOpen] = React.useState(false)

  return (
    <div
      onMouseOver={() => {
        setIsOpen(true)
      }}
      onMouseLeave={() => {
        setIsOpen(false)
      }}
    >
      <Popover
        content={props.content}
        isOpen={isOpen}
        position={props.position}
      >
        {props.children}
      </Popover>
    </div>
  )
}
{
  /* <div
className={css.container}

>
<div>{props.children}</div>
{isOpen && (
  <div className={css.content + positionClass}>{props.content()}</div>
)}
</div> */
}
