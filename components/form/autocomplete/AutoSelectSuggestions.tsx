import React from 'react'

import { ISelectOption } from '../select/ISelectOption'
import classes from './Autocomplete.module.scss'
import _ from 'lodash'

export const AutoSelectSuggestions = (props: {
  width: number
  selectedIdx: number
  suggestions: ISelectOption[]
  nothingFound: React.ReactNode
  onSelect: (selected: ISelectOption) => void
  onHover: (idx: number) => void
}) => {
  let { width, selectedIdx, suggestions, nothingFound } = props
  if (!width) {
    width = 200
  }
  if (!nothingFound) {
    nothingFound = 'No matching suggestions'
  }

  return (
    <div
      className={classes.suggestionList}
      style={{ minWidth: width - 13 + 'px' }}
    >
      {suggestions.length > 0 &&
        _.map(suggestions, (c, idx) => {
          let suggestionClassName = classes.suggestion

          if (idx === selectedIdx) {
            suggestionClassName += ' ' + classes.selectedSuggestion
          }

          return (
            <div
              key={c.value}
              className={suggestionClassName}
              onClick={() => {
                props.onSelect(c)
              }}
              onMouseEnter={() => {
                props.onHover(idx)
              }}
            >
              {c.label}
            </div>
          )
        })}
      {suggestions.length === 0 && <div>{nothingFound}</div>}
    </div>
  )
}
