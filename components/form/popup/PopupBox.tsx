import React, { useEffect, useRef } from 'react'
import styles from './Popup.module.scss'

const popupPositions = {
  topLeftConnectedToBottomLeft: styles.topLeftConnectedToBottomLeft,
}

export type PopupBoxPosition = typeof popupPositions

const defaultProps = {
  position: 'topLeftConnectedToBottomLeft',
}

export const PopupBox = (props: {
  children?: React.ReactNode
  isOpen: boolean
  onClickOutside?: () => void
  inset?: boolean
  noFadeOut?: boolean
  position?: keyof PopupBoxPosition
}) => {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let handleClickOutside = (ev: any) => {
      if (
        props.isOpen &&
        (!el || !el.current || !el.current.contains(ev.target as Node))
      ) {
        props.onClickOutside && props.onClickOutside()
      }
    }
    if (props.isOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  let className = styles.popup
  className +=
    ' ' + popupPositions[props.position || 'topLeftConnectedToBottomLeft']
  className += ' ' + (props.isOpen ? styles.visible : styles.hidden)

  if (props.inset) {
    className += ' ' + styles.inset
  }
  if (props.noFadeOut) {
    className += ' ' + styles.noFadeOut
  }

  return (
    <div ref={el} className={className}>
      {props.children}
    </div>
  )
}
PopupBox.defaultProps = defaultProps
