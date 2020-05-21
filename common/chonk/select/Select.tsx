import React from 'react'
import { l } from '../../lodash/lodash'
import { Popover } from '../popover/Popover'
import css from './Select.module.scss'

export interface ISelectOption {
  value: string
  label?: string
  renderer?: (val: string) => React.ReactNode
}
export const Select = (props: {
  allowText?: boolean
  value?: string
  options?: ISelectOption[]
  onChange?: (newVal: string) => void
}) => {
  let [isOpen, setIsOpen] = React.useState(false)
  let [filterText, setFilterText] = React.useState(null as string | null)

  let allowText = l.defaultTo(props.allowText, false)

  let selectedOption = l.find(props.options, (c) => c.value === props.value)
  if (!selectedOption) {
    selectedOption = l.find(props.options, (c) => c.label === props.value)
  }

  let textValue = ''
  if (selectedOption) {
    textValue = selectedOption.label || selectedOption.value
  } else {
    textValue = props.value || ''
  }

  let filteredOptions = props.options || []
  if (filterText !== null) {
    let filterTextLower = filterText.toLowerCase()
    filteredOptions = l.filter(filteredOptions, (c) => {
      if (c.label && c.label.toLowerCase().indexOf(filterTextLower) !== -1) {
        return true
      }
      if (c.value && c.value.toLowerCase().indexOf(filterTextLower) !== -1) {
        return true
      }
      return false
    })
  }

  return (
    <div className={css.container}>
      <Popover
        isOpen={isOpen}
        position='bottom'
        content={() => (
          <SelectMenu
            options={filteredOptions}
            selectedOption={selectedOption}
            onChange={(newVal) => {
              if (props.onChange) {
                setFilterText(null)
                props.onChange(newVal)
              }
              setIsOpen(false)
            }}
          />
        )}
      >
        <input
          readOnly={!allowText}
          className={css.textInput}
          // value={textValue || ''}
          value={filterText || ''}
          onMouseDown={() => {
            setIsOpen(!isOpen)
          }}
          onKeyDown={(ev) => {
            if (ev.keyCode === 13) {
              // Enter
              setIsOpen(!isOpen)
              setFilterText(null)
              ev.preventDefault()
            } else if (ev.keyCode === 38) {
              // Up
              ev.preventDefault()
              if (!isOpen) {
                setIsOpen(true)
              }
              if (props.options) {
                if (props.onChange) {
                  let lastOption = filteredOptions[filteredOptions.length - 1]
                  if (!selectedOption) {
                    if (lastOption) {
                      props.onChange(lastOption.value)
                    }
                  } else {
                    let selectedOptionIndex = l.indexOf(
                      filteredOptions,
                      selectedOption,
                    )
                    selectedOptionIndex -= 1
                    if (selectedOptionIndex >= 0) {
                      props.onChange(filteredOptions[selectedOptionIndex].value)
                    } else {
                      if (lastOption) {
                        props.onChange(lastOption.value)
                      }
                    }
                  }
                }
              }
            } else if (ev.keyCode === 40) {
              // Down
              ev.preventDefault()
              if (!isOpen) {
                setIsOpen(true)
              }
              if (props.options) {
                if (props.onChange) {
                  let firstOption = filteredOptions[0]
                  if (!selectedOption) {
                    if (firstOption) {
                      props.onChange(firstOption.value)
                    }
                  } else {
                    let selectedOptionIndex = l.indexOf(
                      filteredOptions,
                      selectedOption,
                    )
                    selectedOptionIndex += 1
                    if (selectedOptionIndex < filteredOptions.length) {
                      props.onChange(filteredOptions[selectedOptionIndex].value)
                    } else {
                      if (firstOption) {
                        props.onChange(firstOption.value)
                      }
                    }
                  }
                }
              }
            }
          }}
          onChange={(ev) => {
            if (props.onChange) {
              // props.onChange(ev.target.value)
              setIsOpen(true)
              setFilterText(ev.target.value)
            }
          }}
          onFocus={() => {
            setIsOpen(true)
          }}
          onBlur={() => {
            setIsOpen(false)
          }}
        />
        <div className={css.label}>{filterText === null && textValue}</div>
        <div
          className={css.arrow}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        />
      </Popover>

      {/* <select className={className}>
        <option>an option</option>
        <option>another option</option>
      </select> */}
    </div>
  )
}

export const SelectMenu = (props: {
  options?: ISelectOption[]
  selectedOption?: ISelectOption
  onChange: (newVal: string) => void
}) => {
  return (
    <div className={css.options}>
      {l.map(props.options, (c) => {
        let selectedClass = ''
        if (c === props.selectedOption) {
          selectedClass = ' ' + css.selected
        }
        return (
          <div
            className={css.option + selectedClass}
            key={c.value}
            onMouseDown={() => {
              if (props.onChange) {
                props.onChange(c.value)
              }
            }}
          >
            {c.renderer ? c.renderer(c.value) : c.label || c.value}
          </div>
        )
      })}
    </div>
  )
}
