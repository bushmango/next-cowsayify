import _, { filter } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useClientRect } from '../../../common/hooks/useClientRect'
import { ISelectOption } from '../../state/cowsay'
import { Icon, solidIcons } from '../icon/Icon'
import { Input } from '../input/Input'
import { Popup } from '../popup/Popup'
import { standardizeSelectOptions } from '../select/standardizeSelectOptions'
import css from './Autocomplete.module.scss'
import { AutoSelectSuggestions } from './AutoSelectSuggestions'

export const AutoSelect = (props: {
  value: string
  options: string[] | ISelectOption[]
  onChange?: (newValue: string) => void
  clearValue?: string
  nothingFound?: React.ReactNode
}) => {
  let { value } = props

  let options = standardizeSelectOptions(props.options)
  let selected = _.find(options, (c: any) => c && c.value === value)
  let selectedLabel = (selected && (selected.label || selected.value)) || ''

  const refInput = React.createRef<any>()

  const [searchText, setSearchText] = useState(selectedLabel)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [savedSuggestions, setSavedSuggestions] = useState(
    null as ISelectOption[] | null,
  )
  const [capturedShowSuggestions, setCapturedShowSuggestions] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [rect, refRect] = useClientRect()

  useEffect(() => {
    setSearchText(selectedLabel)
  }, [selectedLabel])

  let suggestions = options
  if (savedSuggestions) {
    suggestions = savedSuggestions
  }
  // if (hasTyped) {
  //   suggestions = filter(options, searchText)
  // }

  let className = css.container
  if (isFocused) {
    className += ' ' + css.focused
  }

  let isClearable = props.clearValue != null && props.clearValue !== props.value
  let width = 200
  let inputWidth = width
  if (rect) {
    width = rect.width
  }
  if (isClearable) {
    inputWidth -= 18
  }
  return (
    <Popup
      noFadeOut={false}
      isOpen={showSuggestions}
      content={
        <AutoSelectSuggestions
          width={width}
          suggestions={suggestions}
          nothingFound={props.nothingFound}
          selectedIdx={selectedIdx}
          onHover={(idx) => {
            setSelectedIdx(idx)
          }}
          onSelect={(selected) => {
            props.onChange && props.onChange(selected.value)
            setSearchText(selected.label || selected.value)
            setShowSuggestions(false)
          }}
        />
      }
    >
      <div className={className} ref={refRect}>
        <Input
          width={inputWidth + 'px'}
          ref={refInput}
          borderless={true}
          autoComplete='off'
          value={isFocused ? searchText : selectedLabel}
          onFocus={async (onFocusRef) => {
            setSelectedIdx(-1)
            setShowSuggestions(true)
            setIsFocused(true)
            setSearchText(selectedLabel)
            if (onFocusRef) {
              onFocusRef.setSelectionRange(0, onFocusRef.value.length)
            }
            setSavedSuggestions(options)
          }}
          onChange={(newVal) => {
            setSearchText(newVal)
            setSelectedIdx(0)
            setSavedSuggestions(filter(options, newVal))
          }}
          onBlur={() => {
            setIsFocused(false)
            if (searchText && searchText !== value) {
              const suggestion: ISelectOption = suggestions[selectedIdx]
              if (suggestion) {
                props.onChange && props.onChange(suggestion.value)
                setSearchText(suggestion.label || suggestion.value)
              }
            }
            setTimeout(() => {
              setShowSuggestions(false)
            }, 1)
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
                const suggestion: ISelectOption = suggestions[selectedIdx]
                if (suggestion) {
                  props.onChange && props.onChange(suggestion.value)
                  setSearchText(suggestion.label || suggestion.value)
                }
                refInput.current.blur()
                setShowSuggestions(false)

                break
            }
          }}
        />
        {props.clearValue != null && props.clearValue !== props.value && (
          <div
            onClick={() => {
              //setSearchText(props.clearValue)
              props.onChange && props.onChange('' + props.clearValue)
            }}
            className={css.icon}
          >
            <Icon icon={solidIcons.faTimes} />
          </div>
        )}

        <div
          onMouseDown={() => {
            setCapturedShowSuggestions(showSuggestions)
          }}
          onMouseUp={() => {
            if (!capturedShowSuggestions) {
              refInput.current.focus()
            }
          }}
          className={css.icon}
        >
          <Icon icon={solidIcons.faAngleDown} />
        </div>
      </div>
    </Popup>
  )
}
