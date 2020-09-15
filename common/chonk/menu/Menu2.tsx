import React from 'react'
import { l } from '../../lodash/lodash'
import { Popover } from '../popover/Popover'

import css from './AriaMenu.module.scss'

import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton'

export const Menu2 = (props: {
  children?: React.ReactNode

  onChange?: (newVal: string) => void
}) => {
  return (
    <div>
      Menu2
      <MyMenuButton />
    </div>
  )
}

const menuItemWords = ['foo', 'bar', 'baz']

class MyMenuButton extends React.Component {
  render() {
    const menuItems = menuItemWords.map((word, i) => {
      return (
        <li key={i}>
          <MenuItem className='MyMenuButton-menuItem'>{word}</MenuItem>
        </li>
      )
    })

    return (
      <Wrapper className={css.ariaMenuButton} onSelection={() => {}}>
        <Button className={css.ariaMenuButtonTrigger}>click me</Button>
        <Menu className={css.ariaMenuButtonMenu}>
          <ul>{menuItems}</ul>
        </Menu>
      </Wrapper>
    )
  }
}
