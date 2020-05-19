import l from 'lodash'

// TODO: extract?
export function isNotAValue(val: any) {
  if (val == null) {
    return true
  }

  if (l.isString(val)) {
    if (val.trim() === '') {
      return true
    }
  }
  return false
}

export function isAValue(val: any) {
  return !isNotAValue(val)
}

export function mustBeLowercase(val: any, message = 'Must be lowercase') {
  let cleanVal = '' + val
  if (cleanVal.toLowerCase() !== val) {
    return message
  }
  return null
}

export function mustBeBoolean(val: any, message = 'Must be boolean') {
  let cleanVal = ('' + val).trim().toLowerCase()
  if (cleanVal === 'false' || cleanVal === 'true') {
    return null
  }
  return message
}
export function convertToBoolean(val: any) {
  if (mustBeBoolean(val)) {
    throw mustBeBoolean(val)
  }
  let cleanVal = ('' + val).trim().toLowerCase()
  return cleanVal === 'true'
}

export function mustBeAnInteger(
  val: any,
  message = 'validation.error.mustBeAnInteger',
) {
  let cleanVal = ('' + val).trim()
  let test = parseInt(cleanVal, 10)
  if (l.isNaN(test)) {
    return message
  }
  // Also ensure no funny characters
  let regEx = new RegExp(/^[-+]?\d+$/)
  if (!regEx.test(cleanVal)) {
    return message
  }
  return null
}

export function mustBeANumber(
  val: any,
  message = 'validation.error.mustBeANumber',
) {
  let cleanVal = ('' + val).trim()
  let test = parseFloat(cleanVal)
  if (l.isNaN(test)) {
    return message
  }
  // Also ensure no funny characters
  let regEx = new RegExp(/^[+-]?[\d]*[\\.]?[\d]*$/)
  if (!regEx.test(cleanVal)) {
    return message
  }
  return null
}

export function mustBeGreaterThan(
  val: any,
  greaterThan: number,
  message = 'Must be greater than ' + greaterThan,
) {
  let cleanVal = ('' + val).trim()
  let test = parseFloat(cleanVal)
  if (l.isNaN(test)) {
    return message
  }
  if (test > greaterThan) {
    return null
  }
  return message
}
