import { sosCowsay } from '../state/sosCowsay-sidecar'
import { IFormData } from '../form/IFormData'
import { IFormCowsayOptions, cowsayOptionsFormMetadata } from '../state/cowsay'
import { FormInput } from '../form/FormInput'
import { FormCheckbox } from '../form/FormCheckbox'
import { FormSelect } from '../form/FormSelect'
import React from 'react'

export const NewFormPage = (props: {}) => {
  const state = sosCowsay.useSubscribe()

  let formData: IFormData<IFormCowsayOptions> = {
    form: state.makeCowForm,
    metadata: cowsayOptionsFormMetadata,
    onUpdateForm: sosCowsay.updateMakeCowForm,
  }

  return (
    <div>
      <div style={{ padding: '2em', margin: '2em', maxWidth: '200px' }}>
        <FormInput formData={formData} field='text' multiline={true} />
        {/* <FormSelect formData={formData} field='action' /> */}
        <FormCheckbox formData={formData} field='action' />
        <FormSelect formData={formData} field='mode' />
        {state.makeCowForm.mode === 'custom' && (
          <React.Fragment>
            <FormInput formData={formData} field='eyes' />
            <FormInput formData={formData} field='tongue' />
          </React.Fragment>
        )}

        <FormSelect formData={formData} field='cow' options={state.cowList} />
      </div>
    </div>
  )
}
