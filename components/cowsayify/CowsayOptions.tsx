import React, { ChangeEvent } from 'react'
import { Button } from '../form/button/Button'
import { FormCheckbox } from '../form/FormCheckbox'
import { FormInput } from '../form/FormInput'
import { FormSelect } from '../form/FormSelect'
import { IFormData } from '../form/IFormData'
import { cowsayOptionsFormMetadata, IFormCowsayOptions } from '../state/cowsay'
import { IStateCowsay } from '../state/sosCowsay'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import css from './CowsayOptions.module.scss'
import { Panel } from './Panel'

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
          defaultValue={''}
          value={props.value}
        />
      </div>
    </div>
  )
}

import { Switch } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Toogle(props: {
  children: React.ReactNode
  isChecked: boolean
  onChange: (isChecked: boolean) => void
}) {
  // const [enabled, setEnabled] = useState(false)

  return (
    <Switch.Group as='div' className='flex items-center'>
      <Switch
        checked={props.isChecked}
        onChange={props.onChange}
        className={classNames(
          props.isChecked ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        )}
      >
        <span
          aria-hidden='true'
          className={classNames(
            props.isChecked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
          )}
        />
      </Switch>
      <Switch.Label as='span' className='ml-3'>
        <span className='text-sm font-medium text-gray-900'>
          {props.children}
        </span>
      </Switch.Label>
    </Switch.Group>
  )
}

export const CowsayOptions = (props: { state: IStateCowsay }) => {
  const { state } = props

  let formData: IFormData<IFormCowsayOptions> = {
    form: state.makeCowForm,
    metadata: cowsayOptionsFormMetadata,
    onUpdateForm: sosCowsay.updateMakeCowForm,
  }

  return (
    <Panel>
      <Textarea
        onChange={(ev) => {
          sosCowsay.updateMakeCowForm('text', ev.target.value)
        }}
        value={state.makeCowForm.text}
        label={
          state.makeCowForm.action === 'think'
            ? 'What the cow thinks'
            : 'What the cow says'
        }
      />
      <Toogle
        isChecked={state.makeCowForm.action === 'think'}
        onChange={(isChecked) => {
          sosCowsay.updateMakeCowForm('action', isChecked ? 'think' : '')
        }}
      >
        This is just a thought
      </Toogle>

      <div className={css.cowForm}>
        <div className={css.cowFormRow}>
          <div className={css.cowFormItem}>
            <FormInput
              formData={formData}
              field='text'
              multiline={true}
              label={
                state.makeCowForm.action === 'think'
                  ? 'What the cow thinks'
                  : undefined
              }
            />
            {/* <FormSelect formData={formData} field='action' /> */}
            <FormCheckbox formData={formData} field='action' />
          </div>

          <div className={css.cowFormItem}>
            <FormSelect
              formData={formData}
              field='cow'
              options={state.cowList}
              clearValue='default'
            />
            {state.makeCowForm.cow === 'default' && (
              <React.Fragment>
                <FormSelect formData={formData} field='mode' clearValue='' />
                {state.makeCowForm.mode === 'custom' && (
                  <React.Fragment>
                    <FormInput formData={formData} field='eyes' />
                    <FormInput formData={formData} field='tongue' />
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        <div className={css.cowFormRow}>
          <div className={css.cowFormItem}>
            <Button
              onClick={() => {
                sosCowsay.doShare()
              }}
            >
              Share this Cow!
            </Button>
          </div>
        </div>

        <div></div>
      </div>
    </Panel>
  )
}
