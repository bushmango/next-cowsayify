import { ChangeEvent } from 'react'

export function Textarea(props: {
  label?: string
  value: string
  onChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div>
      <label
        htmlFor='comment'
        className='block text-sm font-medium text-gray-700'
      >
        {props.label}
      </label>
      <div className='mt-1'>
        <textarea
          onChange={props.onChange}
          rows={4}
          name='comment'
          id='comment'
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          value={props.value || ''}
        />
      </div>
    </div>
  )
}
