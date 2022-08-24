import React, { ChangeEvent } from 'react'
import { Button } from '../form/button/Button'
import { FormCheckbox } from '../form/FormCheckbox'
import { FormInput } from '../form/FormInput'
import { FormSelect } from '../form/FormSelect'
import { IFormData } from '../form/IFormData'
import { Textarea } from '../form2/Textarea'
import Toogle from '../form2/Toggle'
import {
  cowsayOptionsFormMetadata,
  IFormCowsayOptions,
  modes,
} from '../state/cowsay'
import { IStateCowsay } from '../state/sosCowsay'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import css from './CowsayOptions.module.scss'
import { Panel } from '../form2/Panel'
import { Select } from '../form2/Select'
import { SelectOptions } from '../form2/SelectOptions'
import { Input } from '../form2/Input'

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

      <Select
        label='Cow design'
        options={state.cowList}
        selected={state.makeCowForm.cow}
        onChange={(newValue) => {
          sosCowsay.updateMakeCowForm('cow', newValue)
        }}
      />

      {state.makeCowForm.cow === 'default' && (
        <>
          <SelectOptions
            label="Cow's MOOd"
            options={modes}
            selected={state.makeCowForm.mode}
            onChange={(newValue) => {
              console.log('newValue', newValue)
              sosCowsay.updateMakeCowForm('mode', newValue)
            }}
          />

          {state.makeCowForm.mode === 'custom' && (
            <>
              <Input
                maxLength={2}
                id='eyes'
                label='Eyes'
                label2='i.e. **'
                value={state.makeCowForm.eyes}
                onChange={(ev) => {
                  sosCowsay.updateMakeCowForm('eyes', ev.target.value)
                }}
              />
              <Input
                maxLength={2}
                id='tongue'
                label='Tongue'
                label2='i.e. ()'
                value={state.makeCowForm.tongue}
                onChange={(ev) => {
                  sosCowsay.updateMakeCowForm('tongue', ev.target.value)
                }}
              />
            </>
          )}
        </>
      )}

      <Button
        onClick={() => {
          sosCowsay.doShare()
        }}
      >
        Share this Cow!
      </Button>
    </Panel>
  )
}
