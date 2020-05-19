import React, { useEffect, useState } from 'react'
import { ISelectOption } from '../../state/cowsay'
import {
  IAutocompleteOptions,
  defaultFilter,
  allFilter,
} from './autocompleteUtils'
import { standardizeSelectOptions } from '../select/standardizeSelectOptions'
import _ from 'lodash'
import { useClientRect } from '../../../common/hooks/useClientRect'
import classes from './Autocomplete.module.scss'
import { Popup } from '../popup/Popup'
import { Input } from '../input/Input'
import { Icon, solidIcons } from '../icon/Icon'

const defaultProps = {
  maxOptionsToShow: 8,
  type: 'autocomplete',
}

export const Autocomplete = (props: {
  type?: 'autocomplete' | 'select'
  value: string
  options: string[] | ISelectOption[]
  onChange?: (newValue: string) => void
  name?: string
  isClearable?: boolean
  filter?: (options: ISelectOption[], val: string) => IAutocompleteOptions[]
  maxOptionsToShow?: number
}) => {
  let { value, maxOptionsToShow } = props
  let options = standardizeSelectOptions(props.options)
  let selected = _.find(options, (c: any) => c && c.value === value)
  let selectedLabel = (selected && selected.label) || ''

  let filter = props.filter || defaultFilter

  const refInput = React.createRef<any>()

  const [internalText, setInternalText] = useState(selectedLabel)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [capturedShowSuggestions, setCapturedShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([] as IAutocompleteOptions[])
  const [selectedIdx, setSelectedIdx] = useState(0)

  const [rect, refRect] = useClientRect()

  let [isFocused, setIsFocused] = useState(false)
  let className = classes.container
  if (isFocused) {
    className += ' ' + classes.focused
  }

  useEffect(() => {
    setInternalText(selectedLabel)
  }, [selectedLabel])

  const filterSetSuggestions = async (
    val: string,
    textChanged: boolean = false,
  ) => {
    if (props.type === 'autocomplete') {
      if (!val) {
        setSuggestions([])
      } else {
        let rawSuggestions = filter(options, val)
        let topSuggestions = _.take(
          _.orderBy(
            rawSuggestions,
            ['quality', 'option.label'],
            ['desc', 'asc'],
          ),
          maxOptionsToShow,
        )
        setSuggestions(topSuggestions)
      }
    }
    if (props.type === 'select') {
      if (!textChanged) {
        let rawSuggestions = allFilter(options)
        setSuggestions(rawSuggestions)
      } else {
        let rawSuggestions = filter(options, val)
        let topSuggestions = _.take(
          _.orderBy(
            rawSuggestions,
            ['quality', 'option.label'],
            ['desc', 'asc'],
          ),
          maxOptionsToShow,
        )
        setSuggestions(topSuggestions)
      }
    }
  }

  return (
    <Popup
      isOpen={showSuggestions}
      content={
        <div
          className={classes.suggestionList}
          style={{ minWidth: rect && rect.width - 13 }}
        >
          {suggestions.length > 0 &&
            _.map(suggestions, (c, idx) => {
              let { option } = c

              let suggestionClassName = classes.suggestion

              if (idx === selectedIdx) {
                suggestionClassName += ' ' + classes.selectedSuggestion
              }

              return (
                <div
                  key={option.value}
                  className={suggestionClassName}
                  onClick={() => {
                    setInternalText(option.label || '')
                    props.onChange && props.onChange(option.value)
                    setShowSuggestions(false)
                  }}
                  onMouseEnter={() => {
                    setSelectedIdx(idx)
                  }}
                >
                  {option.label}
                </div>
              )
            })}
          {suggestions.length === 0 && <div>No suggestions</div>}
        </div>
      }
    >
      <div className={className} ref={refRect}>
        <Input
          ref={refInput}
          borderless={true}
          autoComplete='off'
          value={internalText}
          onFocus={async (onFocusRef) => {
            setIsFocused(true)
            if (onFocusRef) {
              // Select all of the text to replace it
              onFocusRef.setSelectionRange(0, onFocusRef.value.length)
            }
            // refInput.current.setSelectionRange(0, internalText.length)
            if (props.type === 'autocomplete') {
              if (internalText) {
                await filterSetSuggestions(internalText)
                setSelectedIdx(0)
              }
              setShowSuggestions(internalText !== '')
            }
            if (props.type === 'select') {
              await filterSetSuggestions(internalText)
              setSelectedIdx(-1)
              setShowSuggestions(true)
            }
          }}
          onChange={(newVal) => {
            setInternalText(newVal)
            filterSetSuggestions(newVal, true)
            setShowSuggestions(true)
            setSelectedIdx(0)
          }}
          onBlur={() => {
            setIsFocused(false)
            if (internalText && internalText !== value) {
              const suggestion: ISelectOption = suggestions[selectedIdx]
                ? suggestions[selectedIdx].option
                : { label: '', value: '' }
              setInternalText(suggestion.label || suggestion.value)
              props.onChange && props.onChange(suggestion.value)
            } else {
              if (props.type === 'autocomplete') {
                setInternalText('')
                props.onChange && props.onChange('')
              }
            }
            setShowSuggestions(false)
          }}
          onKeyDown={(
            event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            switch (event.keyCode) {
              // Up arrow
              case 38:
                event.preventDefault()
                setSelectedIdx(Math.max(0, selectedIdx - 1))
                break
              // Down arrow
              case 40:
                event.preventDefault()
                setSelectedIdx(
                  Math.min(suggestions.length - 1, selectedIdx + 1),
                )
                break
              // Enter
              case 13:
                event.preventDefault()
                if (suggestions.length > 0) {
                  props.onChange &&
                    props.onChange(suggestions[selectedIdx].option.value)
                  setShowSuggestions(false)
                }

                break
            }
          }}
        />
        {props.isClearable && (
          <div
            onClick={() => {
              setInternalText('')
            }}
            className={classes.icon}
          >
            <Icon icon={solidIcons.faTimes} />
          </div>
        )}
        {props.type === 'select' && (
          <div
            onMouseDown={() => {
              setCapturedShowSuggestions(showSuggestions)
            }}
            onMouseUp={() => {
              if (!capturedShowSuggestions) {
                refInput.current.focus()
              }
            }}
            className={classes.icon}
          >
            <Icon icon={solidIcons.faAngleDown} />
          </div>
        )}
      </div>
    </Popup>
  )
}
Autocomplete.defaultProps = defaultProps
