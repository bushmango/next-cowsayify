import React from 'react'
import { l } from '../../lodash/lodash'
import { Popover } from '../popover/Popover'
import css from './Menu.module.scss'

export interface IMenuOption {
  value: string
  label?: string
  renderer?: (val: string) => React.ReactNode
}
export const Menu = (props: {
  children: React.ReactNode
  options?: IMenuOption[]
}) => {
  let [isOpen, setIsOpen] = React.useState(false)
  let [selectedValue, setSelectedValue] = React.useState('')

  let selectedOption = l.find(props.options, (c) => c.value === selectedValue)

  let options = props.options || []

  const doOpen = (isOpen: boolean) => {
    setSelectedValue('')
    setIsOpen(isOpen)
  }

  const onKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    console.log('keydown!', ev.key)
    if (ev.key === 'Enter') {
      doOpen(!isOpen)
      ev.preventDefault()
    }
    if (ev.key === 'ArrowUp') {
      // Up
      ev.preventDefault()
      if (!isOpen) {
        doOpen(true)
      }
      if (props.options) {
        let lastOption = options[options.length - 1]
        if (!selectedOption) {
          if (lastOption) {
            setSelectedValue(lastOption.value)
          }
        } else {
          let selectedOptionIndex = l.indexOf(options, selectedOption)
          selectedOptionIndex -= 1
          if (selectedOptionIndex >= 0) {
            setSelectedValue(options[selectedOptionIndex].value)
          } else {
            if (lastOption) {
              setSelectedValue(lastOption.value)
            }
          }
        }
      }
    }
    if (ev.key === 'ArrowDown') {
      // Down
      ev.preventDefault()
      if (!isOpen) {
        doOpen(true)
      }
      if (props.options) {
        let firstOption = options[0]
        if (!selectedOption) {
          if (firstOption) {
            setSelectedValue(firstOption.value)
          }
        } else {
          let selectedOptionIndex = l.indexOf(options, selectedOption)
          selectedOptionIndex += 1
          if (selectedOptionIndex < options.length) {
            setSelectedValue(options[selectedOptionIndex].value)
          } else {
            if (firstOption) {
              setSelectedValue(firstOption.value)
            }
          }
        }
      }
    }
  }

  return (
    <div className={css.container}>
      <Popover
        isOpen={isOpen}
        position='bottom'
        content={() => (
          <MenuItems
            options={options}
            selectedOption={selectedOption}
            // onChange={(newVal) => {
            //   // if (props.onChange) {
            //   //   props.onChange(newVal)
            //   // }
            //   doOpen(false)
            // }}
          />
        )}
      >
        <div
          tabIndex={0}
          className={css.menuTop}
          onMouseDown={() => {
            doOpen(!isOpen)
          }}
          onKeyDown={onKeyDown}
          onFocus={() => {
            doOpen(true)
          }}
          onBlur={() => {
            doOpen(false)
          }}
        >
          {props.children}
        </div>
      </Popover>
    </div>
  )
}

export const MenuItems = (props: {
  options?: IMenuOption[]
  selectedOption?: IMenuOption
}) => {
  return (
    <div className={css.menuItems}>
      {l.map(props.options, (c) => {
        let selectedClass = ''
        if (c === props.selectedOption) {
          selectedClass = ' ' + css.selected
        }
        return (
          <div
            className={css.menuItem + selectedClass}
            key={c.value}
            onMouseDown={() => {
              // if (props.onChange) {
              //   props.onChange(c.value)
              // }
            }}
          >
            {c.renderer ? c.renderer(c.value) : c.label || c.value}
          </div>
        )
      })}
    </div>
  )
}
