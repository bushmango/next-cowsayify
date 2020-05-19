import React from 'react'

import styles from './Popup.module.scss'
import { PopupBox, PopupBoxPosition } from './PopupBox'

export const Popup = (props: {
  children?: React.ReactNode
  isOpen: boolean
  onClickOutside?: () => void
  content: React.ReactNode
  inset?: boolean
  position?: keyof PopupBoxPosition
  noFadeOut?: boolean
}) => {
  return (
    <div className={styles.popupContainer}>
      <PopupBox
        isOpen={props.isOpen}
        noFadeOut={props.noFadeOut}
        onClickOutside={props.onClickOutside}
        inset={props.inset}
        position={props.position}
      >
        {props.content}
      </PopupBox>
      {props.children}
    </div>
  )
}
