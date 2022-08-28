import { ChangeEvent } from 'react'

export function Input(props: {
  label: string
  label2: string
  id: string
  value: string
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
}) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className='block text-sm font-medium text-gray-700'
      >
        {props.label}
      </label>
      <div className='mt-1'>
        <input
          type='text'
          maxLength={props.maxLength}
          // type='email'
          name={props.id}
          id={props.id}
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          // placeholder='you@example.com'
          aria-describedby={props.id + '-description'}
          value={props.value || ''}
          onChange={props.onChange}
        />
      </div>
      <p className='mt-2 text-sm text-gray-500' id={props.id + '-description'}>
        {props.label2}
      </p>
    </div>
  )
}
