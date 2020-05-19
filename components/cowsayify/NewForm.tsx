import { FormInput, FormSelect, IFormData } from '@/common/components/form'
import { IFormMetadataCollection } from '@/common/components/form/IFormMetadata'
import {
  modes,
  actions,
  IFormCowsayOptions,
  cowsayOptionsFormMetadata,
} from '@/state/cowsay'
import React, { useState } from 'react'
import { sosCowsay } from '@/state'
import { FormCheckbox } from '@/common/components/form/FormCheckbox'

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
