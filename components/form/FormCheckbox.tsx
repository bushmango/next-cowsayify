import l from 'lodash'
import React from 'react'
import css from './Form.module.scss'
import { IFormData } from './IFormData'

export function FormCheckbox<T>(props: {
  formData: IFormData<T>
  field: keyof T
  multiline?: boolean
}) {
  let { formData, field } = props

  let v = '' + formData.form[field]
  let m = formData.metadata[field]

  return (
    <div>
      <label className={css.checkboxLabel}>
        <input
          type='checkbox'
          className={css.checkboxInput}
          checked={v === m.trueValue}
          onChange={() => {
            if (v === m.trueValue) {
              formData.onUpdateForm(field, m.falseValue)
            } else {
              formData.onUpdateForm(field, m.trueValue)
            }
          }}
        />
        {m.label || l.startCase('' + field)}
      </label>
    </div>
  )
}
