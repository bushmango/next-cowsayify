import React from 'react'
import { IFormData } from './IFormData'
import { validation } from './validation-sidecar'
import { formValidator } from './formValidator-sidecar'
import { StackedItem } from './StackedItem'
import _ from 'lodash'

export function FormStackedItem<T>(props: {
  children: React.ReactNode
  formData: IFormData<T>
  field: keyof T
  label?: string
}) {
  let { field, formData } = props

  if (!formData || !formData.metadata) {
    return <div>No form data</div>
  }

  let meta = formData.metadata[props.field]
  let val: any = formData.form[field]
  let isAValue = validation.isAValue(val)
  let showRequired = meta.required && !isAValue
  // let showRecommended = meta.recommended && !isAValue

  let error = null
  if (isAValue) {
    error = formValidator.validateValue(meta, val, false)
  }

  return (
    <StackedItem
      label={props.label || meta.label || _.startCase(field as string)}
      description={meta.description}
      isRequired={showRequired}
      validationError={error}
    >
      {props.children}
    </StackedItem>
  )
}
