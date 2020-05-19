import React from 'react'

import { FormStackedItem } from './FormStackedItem'
import { IFormData } from './IFormData'
import { Input } from './input/Input'

export function FormInput<T>(props: {
  formData: IFormData<T>
  field: keyof T
  multiline?: boolean
  label?: string
}) {
  let { formData, field } = props

  let v = '' + formData.form[field]
  let m = formData.metadata[field]

  return (
    <FormStackedItem formData={formData} field={field} label={props.label}>
      <Input
        value={v}
        multiline={props.multiline}
        maxLength={m.maxLength}
        onChange={(newVal) => {
          formData.onUpdateForm(field, newVal)
        }}
      />
    </FormStackedItem>
  )
}
