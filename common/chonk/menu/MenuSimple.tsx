import React from 'react'
import { l } from '../../lodash/lodash'
import css from './Menu.module.scss'

export interface IMenuSimpleOption {
  value: string
  label?: string
  renderer?: (val: string) => React.ReactNode
}
export const MenuSimple = (props: {
  value?: string
  options?: IMenuSimpleOption[]
  onChange?: (newVal: string) => void
}) => {
  let [isOpen, setIsOpen] = React.useState(false)

  let selectedOption = l.find(props.options, (c) => c.value === props.value)
  if (!selectedOption) {
    selectedOption = l.find(props.options, (c) => c.label === props.value)
  }

  const onKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.keyCode === 13) {
      // Enter
      setIsOpen(!isOpen)
      ev.preventDefault()
    } else if (ev.keyCode === 38) {
      // Up
      ev.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      }
      if (props.options) {
        if (props.onChange) {
          let lastOption = props.options[props.options.length - 1]
          if (!selectedOption) {
            if (lastOption) {
              props.onChange(lastOption.value)
            }
          } else {
            let selectedOptionIndex = l.indexOf(props.options, selectedOption)
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
          let firstOption = props.options[0]
          if (!selectedOption) {
            if (firstOption) {
              props.onChange(firstOption.value)
            }
          } else {
            let selectedOptionIndex = l.indexOf(props.options, selectedOption)
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
    }
  }

  return (
    <div className={css.container}>
      <div
        className={css.menuTop}
        onMouseDown={() => {
          setIsOpen(!isOpen)
        }}
        onKeyDown={onKeyDown}
        onFocus={() => {
          setIsOpen(true)
        }}
        onBlur={() => {
          setIsOpen(false)
        }}
      >
        File
      </div>
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
    </div>
  )
}
