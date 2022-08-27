import React from 'react'

import classes from './Button.module.scss'

// https://tailwindui.com/components/application-ui/elements/buttons
export const Button = (props: {
  children: React.ReactNode
  onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
  submit?: boolean
}) => {
  return (
    <button
      className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      onClick={props.onClick}
      type={props.submit ? 'submit' : 'button'}
    >
      {props.children}
    </button>
  )
}
