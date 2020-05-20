import React from 'react'
import css from './Checkbox.module.scss'

export const Checkbox = (props: {
  children: React.ReactNode
  checked: boolean
  onChange?: (newVal: boolean) => any
}) => {
  const toggle = (ev: any) => {
    if (props.onChange) {
      props.onChange(!props.checked)
    }
    ev.preventDefault()
    return false
  }
  return (
    <label className={css.label} onClick={toggle}>
      {props.checked && <div className={css.unchecked}></div>}
      {!props.checked && <div className={css.checked}>X</div>}
      <div>
        <input type='checkbox' checked={props.checked} onChange={toggle} />
      </div>
      <div>{props.children}</div>
    </label>
  )
}
