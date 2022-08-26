import { Button } from '../form/button/Button'
import { IFormData } from '../form/IFormData'
import { Input } from '../form2/Input'
import { SelectOptions } from '../form2/SelectOptions'
import { Textarea } from '../form2/Textarea'
import Toogle from '../form2/Toggle'
import {
  cowsayOptionsFormMetadata,
  IFormCowsayOptions,
  ISelectOption,
  modes,
} from '../state/cowsay'
import { IStateCowsay } from '../state/sosCowsay'
import { sosCowsay } from '../state/sosCowsay-sidecar'

export const Separator = () => {
  return (
    <div className='hidden sm:block' aria-hidden='true'>
      <div className='py-5'>
        <div className='border-t border-gray-200' />
      </div>
    </div>
  )
}

export const CowsayOptions = (props: { state: IStateCowsay }) => {
  const { state } = props

  let formData: IFormData<IFormCowsayOptions> = {
    form: state.makeCowForm,
    metadata: cowsayOptionsFormMetadata,
    onUpdateForm: sosCowsay.updateMakeCowForm,
  }
  let cowAction = state.makeCowForm.action === 'think' ? 'thinks' : 'says'
  let cowType =
    state.makeCowForm.cow === 'default' ? 'cow' : state.makeCowForm.cow
  cowType = cowType.replace(/\-/g, ' ')
  let cowLine = `What the ${cowType} ${cowAction}`

  const modifiedCowList: ISelectOption[] = state.cowList.map((c) => {
    let label = c
    if (label === 'default') {
      label = 'cow'
    }
    if (label.length > 0) {
      label = label[0].toUpperCase() + label.substring(1)
    }
    label = label.replace(/\-/g, ' ')
    return {
      value: c,
      label: label,
    }
  })
  modifiedCowList.sort((a, b) => (a.label || '')?.localeCompare(b.label || ''))

  return (
    <div>
      <div className='mt-10 sm:mt-0'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Control your cow
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Their destiny is in your hands.
              </p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form action='#' method='POST'>
              <div className='shadow overflow-hidden sm:rounded-md'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <SelectOptions
                        label='Cow type'
                        options={modifiedCowList}
                        selected={state.makeCowForm.cow}
                        onChange={(newValue) => {
                          sosCowsay.updateMakeCowForm('cow', newValue)
                        }}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      {state.makeCowForm.cow === 'default' && (
                        <SelectOptions
                          label='MOOd'
                          options={modes}
                          selected={state.makeCowForm.mode}
                          onChange={(newValue) => {
                            // console.log('newValue', newValue)
                            sosCowsay.updateMakeCowForm('mode', newValue)
                          }}
                        />
                      )}
                    </div>

                    {state.makeCowForm.mode === 'custom' && (
                      <>
                        <div className='col-span-6 sm:col-span-3'>
                          <Input
                            maxLength={2}
                            id='eyes'
                            label='Eyes'
                            label2='i.e. **'
                            value={state.makeCowForm.eyes}
                            onChange={(ev) => {
                              sosCowsay.updateMakeCowForm(
                                'eyes',
                                ev.target.value,
                              )
                            }}
                          />
                        </div>

                        <div className='col-span-6 sm:col-span-3'>
                          <Input
                            maxLength={2}
                            id='tongue'
                            label='Tongue'
                            label2='i.e. ()'
                            value={state.makeCowForm.tongue}
                            onChange={(ev) => {
                              sosCowsay.updateMakeCowForm(
                                'tongue',
                                ev.target.value,
                              )
                            }}
                          />
                        </div>
                      </>
                    )}

                    <div className='col-span-6'>
                      <Textarea
                        onChange={(ev) => {
                          sosCowsay.updateMakeCowForm('text', ev.target.value)
                        }}
                        value={state.makeCowForm.text}
                        label={cowLine}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <Toogle
                        isChecked={state.makeCowForm.action === 'think'}
                        onChange={(isChecked) => {
                          sosCowsay.updateMakeCowForm(
                            'action',
                            isChecked ? 'think' : '',
                          )
                        }}
                      >
                        This is just a thought
                      </Toogle>
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <Button
                    onClick={() => {
                      sosCowsay.doShare()
                    }}
                  >
                    Share this Cow!
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Separator />
    </div>
  )
}
