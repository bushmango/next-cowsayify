import { ISelectOption } from '../select/ISelectOption'

export interface IFormMetadata<T> {
  label?: string
  description?: string
  required?: boolean
  recommended?: boolean
  readOnly?: boolean
  multiline?: boolean
  maxLength?: number
  mustBeABoolean?: boolean
  mustBeAnInteger?: boolean
  mustBeANumber?: boolean
  mustBeGreaterThan?: number
  customValidator?: () => string
  options?: string[] | ISelectOption[]
  clearable?: boolean
  defaultValue?: string
  trueValue?: string
  falseValue?: string
}

export type IFormMetadataCollection<T> = { [key in keyof T]: IFormMetadata<T> }
