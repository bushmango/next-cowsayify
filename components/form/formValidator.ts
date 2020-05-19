import { l } from '../../common/lodash/lodash'
import { IFormMetadata, IFormMetadataCollection } from './IFormMetadata'
import { validation } from './validation-sidecar'

export function validateValue<T>(
  meta: IFormMetadata<T>,
  val: any,
  includeLabel: boolean = true,
) {
  let errorLabel: string | null = null

  let error: any | null = null
  errorLabel = meta.label || null

  if (!error && meta.required && validation.isNotAValue(val)) {
    error = `${meta.label} is required`
    errorLabel = null
  }

  if (val != null && val !== '') {
    if (!error && meta.mustBeANumber) {
      error = validation.mustBeANumber(val)
    }
    if (!error && meta.mustBeAnInteger) {
      error = validation.mustBeAnInteger(val)
    }
    if (!error && meta.mustBeGreaterThan) {
      error = validation.mustBeGreaterThan(val, meta.mustBeGreaterThan)
    }
  }
  if (error) {
    if (includeLabel && errorLabel) {
      error = `${errorLabel}: ${error}`
    }
  }
  return error
}

export function validateFormItem<T>(
  form: T,
  formMetadata: IFormMetadataCollection<T>,
  field: keyof T,
) {
  let meta = formMetadata[field]
  let val = form[field]
  return validateValue(meta, val)
}

export function validateForm<T>(
  form: T,
  formMetadata: IFormMetadataCollection<T>,
) {
  let errors: string[] = []

  l.forIn(formMetadata, (meta, field) => {
    let val = form[field as keyof T]
    let error = validateValue(meta, val)
    if (error) {
      errors.push(error)
    }
  })

  return {
    isValid: errors.length === 0,
    error: errors.length > 0 ? errors[0] : null,
    errors,
  }
}
