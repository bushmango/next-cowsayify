import React from 'react'
import { l } from '../../lodash/lodash'
import css from './Tabs.module.scss'

export interface ITabOption {
  value: string
  label?: string
  renderer?: (val: string) => React.ReactNode
}
export const Tabs = (props: {
  children: React.ReactNode
  options?: ITabOption[]
}) => {
  let [selectedValue, setSelectedValue] = React.useState('')
  let selectedOption = l.find(props.options, (c) => c.value === selectedValue)

  let options = props.options || []

  return (
    <div className={css.tabsContainer}>
      <TabItems
        options={options}
        selectedOption={selectedOption}
        onSelect={(newValue) => {
          setSelectedValue(newValue)
        }}
      />
      <div>{props.children}</div>
    </div>
  )
}

export const TabItems = (props: {
  options: ITabOption[]
  selectedOption?: ITabOption
  onSelect: (value: string) => void
}) => {
  return (
    <div className={css.tabItems}>
      {l.map(props.options, (c) => {
        let selectedClass = ''
        if (c === props.selectedOption) {
          selectedClass = ' ' + css.selected
        }
        return (
          <div
            className={css.tabItem + selectedClass}
            key={c.value}
            onMouseDown={() => {
              props.onSelect(c.value)
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
