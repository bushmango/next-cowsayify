import React from 'react'

import styles from './CowsayOptions.module.scss'
import { IStateCowsay } from '../state/sosCowsay'
import { IFormCowsayOptions, cowsayOptionsFormMetadata } from '../state/cowsay'
import { sosCowsay } from '../state/sosCowsay-sidecar'

export const CowsayOptions = (props: { state: IStateCowsay }) => {
  const { state } = props

  // let formData: IFormData<IFormCowsayOptions> = {
  //   form: state.makeCowForm,
  //   metadata: cowsayOptionsFormMetadata,
  //   onUpdateForm: sosCowsay.updateMakeCowForm,
  // }

  return <div className={styles.cowForm}>cow form goes here</div>
}

// <div className={styles.cowFormRow}>
// <div className={styles.cowFormItem}>
//   <FormInput
//     formData={formData}
//     field='text'
//     multiline={true}
//     label={
//       state.makeCowForm.action === 'think'
//         ? 'What the cow thinks'
//         : undefined
//     }
//   />
//   {/* <FormSelect formData={formData} field='action' /> */}
//   <FormCheckbox formData={formData} field='action' />
// </div>

// <div className={styles.cowFormItem}>
//   <FormSelect
//     formData={formData}
//     field='cow'
//     options={state.cowList}
//     clearValue='default'
//   />
//   {state.makeCowForm.cow === 'default' && (
//     <React.Fragment>
//       <FormSelect formData={formData} field='mode' clearValue='' />
//       {state.makeCowForm.mode === 'custom' && (
//         <React.Fragment>
//           <FormInput formData={formData} field='eyes' />
//           <FormInput formData={formData} field='tongue' />
//         </React.Fragment>
//       )}
//     </React.Fragment>
//   )}
// </div>
// </div>
// <div className={styles.cowFormRow}>
// <div className={styles.cowFormItem}>
//   <Button
//     onClick={() => {
//       sosCowsay.doShare()
//     }}
//   >
//     Share this Cow!
//   </Button>
// </div>
// </div>

// <div></div>
