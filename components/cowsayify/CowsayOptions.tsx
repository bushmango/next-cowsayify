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
              <FormInput formData={formData} field='eyes' />
              <FormInput formData={formData} field='tongue' />
            </>
          )}
        </>
      )}

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
