import React from 'react'

import { FormStackedItem } from './FormStackedItem'
import { IFormData } from './IFormData'
import { ISelectOption } from '../state/cowsay'
import { Select } from './select/Select'

export function FormSelect<T>(props: {
  formData: IFormData<T>
  field: keyof T
  options?: string[] | ISelectOption[]
  clearValue?: string
}) {
  let { formData, field } = props

  let v = '' + formData.form[field]
  let m = formData.metadata[field]

  let options = m.options || []

  return (
    <FormStackedItem formData={formData} field={field}>
      <Select
        value={v}
        options={props.options || options}
        onChange={(newVal) => {
          formData.onUpdateForm(field, newVal)
        }}
        clearValue={props.clearValue}
      />
    </FormStackedItem>
  )
}
