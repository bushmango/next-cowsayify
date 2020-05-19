import { _ } from '@/common/imports'

import { ISelectOption } from '../select/ISelectOption'

export const filter = (options: ISelectOption[], searchText: string) => {
  let suggestions: ISelectOption[] = []
  _.forEach(options, (c) => {
    let quality = 0
    let search = _.lowerCase(searchText).trim()
    let value = _.lowerCase(c.value)
    let label = _.lowerCase(c.label || c.value)
    if (label === search) {
      quality = 1
    } else if (value === search) {
      quality = 0.9
    } else if (label.indexOf(search) !== -1) {
      quality = 0.8
    } else if (value && value.indexOf(search) !== -1) {
      quality = 0.7
    }
    if (quality) {
      suggestions.push({ value: c.value, label: c.label, quality })
    }
  })
  suggestions = _.sortBy(suggestions, 'quality')
  return suggestions
}

// Remove after this line

export interface IAutocompleteOptions {
  quality: number
  option: ISelectOption
}

export const defaultGetQualityForSuggestion = (
  label: string,
  val: string,
  searchTerm: string,
) => {
  val = _.lowerCase(val)
  searchTerm = _.lowerCase(searchTerm)
  label = _.lowerCase(label)
  if (val === searchTerm || label === searchTerm) {
    return 1
  }
  if (label.indexOf(searchTerm) === 0) {
    return 0.6
  }
  return 0.3
}

export const allFilter = (options: ISelectOption[]): IAutocompleteOptions[] => {
  return _.map(options, (c) => ({
    quality: 1,
    option: c,
  }))
}

export const defaultFilter = (
  options: ISelectOption[],
  val: string,
): IAutocompleteOptions[] => {
  val = _.lowerCase(val)
  const suggestions = _.filter(
    options,
    (c) =>
      _.lowerCase(c.value).indexOf(val) !== -1 ||
      _.lowerCase(c.label).indexOf(val) !== -1,
  )

  return _.map(suggestions, (c) => ({
    quality: defaultGetQualityForSuggestion(c.label || c.value, c.value, val),
    option: c,
  }))
}
