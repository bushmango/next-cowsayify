import React from 'react'

import css from './Select.module.scss'

export const Select = (props: {}) => {
  let className = css.select

  return (
    <select className={className}>
      <option>an option</option>
    </select>
  )
}
