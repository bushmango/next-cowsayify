import { ISelectOption } from '../../state/cowsay'
import _ from 'lodash'

export const standardizeSelectOptions = (
  options: Array<ISelectOption | string>,
): ISelectOption[] => {
  return _.map(options, (c: any) => {
    if (_.isString(c)) {
      return { value: c, label: c }
    }
    return {
      value: c.value,
      label: c.label || c.value,
    }
  })
}
