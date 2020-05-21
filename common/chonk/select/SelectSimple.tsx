import React from 'react'
import { l } from '../../lodash/lodash'
import css from './Select.module.scss'

export interface ISelectOption {
  value: string
  label?: string
  renderer?: (val: string) => React.ReactNode
}
export const SelectSimple = (props: {
  value?: string
  options?: ISelectOption[]
  onChange?: (newVal: string) => void
}) => {
  let [isOpen, setIsOpen] = React.useState(false)
  let [isCustomText, setIsCustomText] = React.useState(false)

  let selectedOption = l.find(props.options, (c) => c.value === props.value)
  if (!selectedOption) {
    selectedOption = l.find(props.options, (c) => c.label === props.value)
  }

  return (
    <div className={css.container}>
      <input
        className={css.textInput}
        value={
          selectedOption && !isCustomText
            ? selectedOption.label || selectedOption.value
            : props.value
        }
        onMouseDown={() => {
          setIsOpen(!isOpen)
        }}
        onKeyDown={(ev) => {
          if (ev.keyCode === 13) {
            // Enter
            setIsOpen(!isOpen)
            setIsCustomText(false)
            ev.preventDefault()
          } else if (ev.keyCode === 38) {
            // Up
            ev.preventDefault()
            if (!isOpen) {
              setIsOpen(true)
            }
            if (props.options) {
              if (props.onChange) {
                setIsCustomText(false)
                let lastOption = props.options[props.options.length - 1]
                if (!selectedOption) {
                  if (lastOption) {
                    props.onChange(lastOption.value)
                  }
                } else {
                  let selectedOptionIndex = l.indexOf(
                    props.options,
                    selectedOption,
                  )
                  selectedOptionIndex -= 1
                  if (selectedOptionIndex >= 0) {
                    props.onChange(props.options[selectedOptionIndex].value)
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
                setIsCustomText(false)
                let firstOption = props.options[0]
                if (!selectedOption) {
                  if (firstOption) {
                    props.onChange(firstOption.value)
                  }
                } else {
                  let selectedOptionIndex = l.indexOf(
                    props.options,
                    selectedOption,
                  )
                  selectedOptionIndex += 1
                  if (selectedOptionIndex < props.options.length) {
                    props.onChange(props.options[selectedOptionIndex].value)
                  } else {
                    if (firstOption) {
                      props.onChange(firstOption.value)
                    }
                  }
                }
              }
            }
          } else {
            setIsCustomText(true)
          }
        }}
        onChange={(ev) => {
          if (props.onChange) {
            props.onChange(ev.target.value)
          }
        }}
        onFocus={() => {
          setIsOpen(true)
        }}
        onBlur={() => {
          setIsOpen(false)
        }}
      />
      {isOpen && (
        <div className={css.options}>
          {l.map(props.options, (c) => {
            let selectedClass = ''
            if (c === selectedOption) {
              selectedClass = ' ' + css.selected
            }
            return (
              <div
                className={css.option + selectedClass}
                key={c.value}
                onMouseDown={() => {
                  if (props.onChange) {
                    setIsCustomText(false)
                    props.onChange(c.value)
                  }
                  setIsOpen(false)
                }}
              >
                {c.renderer ? c.renderer(c.value) : c.label || c.value}
              </div>
            )
          })}
        </div>
      )}
      <div
        className={css.arrow}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      />
      {/* <select className={className}>
        <option>an option</option>
        <option>another option</option>
      </select> */}
    </div>
  )
}
