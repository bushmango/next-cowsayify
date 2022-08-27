import { useAtom } from 'jotai'
import { Button } from '../form2/button/Button'
import { Input } from '../form2/Input'
import { SelectOptions } from '../form2/SelectOptions'
import { Textarea } from '../form2/Textarea'
import Toogle from '../form2/Toggle'
import {
  cowOptionsAtom,
  IFormCowsayOptions,
  ISelectOption,
  modes,
} from '../state/cowsay'
import { sosCowsay } from '../state/sosCowsay-sidecar'
import { cowListAtom } from './CowListLoader'

const alwaysShowMOOd = true

export const Separator = () => {
  return (
    <div className='hidden sm:block' aria-hidden='true'>
      <div className='py-5'>
        <div className='border-t border-gray-200' />
      </div>
    </div>
  )
}

export const Constrainer = (props: { children: React.ReactNode }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className='max-w-4xl mx-auto'>{props.children}</div>
    </div>
  )
}

export const CowsayOptions = (props: {}) => {
  let [cowOptions, setCowOptions] = useAtom(cowOptionsAtom)
  let [cowList] = useAtom(cowListAtom)

  const updateForm = (update: Partial<IFormCowsayOptions>) => {
    setCowOptions({ ...cowOptions, ...update })
  }

  let cowAction = cowOptions.action === 'think' ? 'thinks' : 'says'
  let cowType = cowOptions.cow === 'default' ? 'cow' : cowOptions.cow
  cowType = cowType.replace(/\-/g, ' ')
  let cowLine = `What the ${cowType} ${cowAction}`

  const modifiedCowList: ISelectOption[] = cowList.map((c) => {
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
    <Constrainer>
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
                        selected={cowOptions.cow}
                        onChange={(newValue) => {
                          updateForm({ cow: newValue })
                        }}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      {(alwaysShowMOOd || cowOptions.cow === 'default') && (
                        <SelectOptions
                          label={
                            'MOOd' +
                            (cowOptions.cow !== 'default'
                              ? ' (only for some cows)'
                              : '')
                          }
                          options={modes}
                          selected={cowOptions.mode}
                          onChange={(newValue) => {
                            updateForm({ mode: newValue })
                          }}
                        />
                      )}
                    </div>

                    {cowOptions.mode === 'custom' && (
                      <>
                        <div className='col-span-6 sm:col-span-3'>
                          <Input
                            maxLength={2}
                            id='eyes'
                            label='Eyes'
                            label2='i.e. **'
                            value={cowOptions.eyes}
                            onChange={(ev) => {
                              updateForm({ eyes: ev.target.value })
                            }}
                          />
                        </div>

                        <div className='col-span-6 sm:col-span-3'>
                          <Input
                            maxLength={2}
                            id='tongue'
                            label='Tongue'
                            label2='i.e. ()'
                            value={cowOptions.tongue}
                            onChange={(ev) => {
                              updateForm({ tongue: ev.target.value })
                            }}
                          />
                        </div>
                      </>
                    )}

                    <div className='col-span-6'>
                      <Textarea
                        onChange={(ev) => {
                          updateForm({ text: ev.target.value })
                        }}
                        value={cowOptions.text}
                        label={cowLine}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <Toogle
                        isChecked={cowOptions.action === 'think'}
                        onChange={(isChecked) => {
                          updateForm({ action: isChecked ? 'think' : '' })
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
                      sosCowsay.doShare(cowOptions)
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
    </Constrainer>
  )
}
