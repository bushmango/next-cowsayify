import React from 'react'

import css from './Form.module.scss'

export const StackedItem = (props: {
  children: React.ReactNode
  validationError?: string | null
  label?: string
  description?: string
  isRequired?: boolean
}) => {
  let { validationError, label, isRequired, description } = props

  return (
    <div className={css.stacked}>
      {label && (
        <div className={css.label}>
          {label} {isRequired && <span>*</span>}{' '}
        </div>
      )}

      <div className={css.control}>{props.children}</div>

      {description && <div className={css.description}>{description}</div>}

      {validationError && (
        <div className={css.validation}>{validationError}</div>
      )}
    </div>
  )
}
