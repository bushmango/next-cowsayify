import React from 'react'
const Spinner = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='-ml-0.5 mr-2 h-4 w-4 animate-spin'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M13 10V3L4 14h7v7l9-11h-7z'
    />
  </svg>
)

// https://tailwindui.com/components/application-ui/elements/buttons
export const Button = (props: {
  children: React.ReactNode
  onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
  submit?: boolean
  disabled?: boolean
  spinning?: boolean
}) => {
  let xtraClasses = ''
  if (props.disabled) {
    xtraClasses += ' disable'
  }

  return (
    <button
      disabled={props.disabled}
      className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400'
      onClick={props.onClick}
      type={props.submit ? 'submit' : 'button'}
    >
      {props.spinning && <Spinner />}
      {/* <EnvelopeIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' /> */}
      {props.children}
    </button>
  )
}
