import React from 'react'
import { Button } from '../form/button/Button'
import { FormCheckbox } from '../form/FormCheckbox'
import { FormInput } from '../form/FormInput'
import { FormSelect } from '../form/FormSelect'
import { IFormData } from '../form/IFormData'
import { cowsayOptionsFormMetadata, IFormCowsayOptions } from '../state/cowsay'
import { IStateCowsay } from '../state/sosCowsay'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import css from './CowsayOptions.module.scss'

export const CowsayOptions = (props: { state: IStateCowsay }) => {
  const { state } = props

  let formData: IFormData<IFormCowsayOptions> = {
    form: state.makeCowForm,
    metadata: cowsayOptionsFormMetadata,
    onUpdateForm: sosCowsay.updateMakeCowForm,
  }

  return (
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
  )
}
