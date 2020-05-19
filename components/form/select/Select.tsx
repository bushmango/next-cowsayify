import React from 'react'

import { ISelectOption } from './ISelectOption'
import { AutoSelect } from '../autocomplete/AutoSelect'

export const Select = (props: {
  value: string
  options: string[] | ISelectOption[]
  onChange?: (newValue: string) => void
  clearValue?: string
}) => {
  return (
    <AutoSelect
      value={props.value}
      options={props.options}
      onChange={props.onChange}
      clearValue={props.clearValue}
    />
  )
}
