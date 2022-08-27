import { atomWithStorage } from 'jotai/utils'

export type TAction = 'say' | 'think'

export interface ISelectOption {
  value: string
  label?: string
}

export const actions: ISelectOption[] = [
  {
    value: 'say',
    label: 'Say',
  },
  {
    value: 'think',
    label: 'Think',
  },
]

export const modes: ISelectOption[] = [
  {
    value: '',
    label: 'Normal',
  },
  {
    value: 'b',
    label: 'Borg',
  },
  {
    value: 'd',
    label: 'Dead',
  },
  {
    value: 'g',
    label: 'Greedy',
  },
  {
    value: 'p',
    label: 'Paranoid',
  },
  {
    value: 's',
    label: 'Stoned',
  },
  {
    value: 't',
    label: 'Tired',
  },
  {
    value: 'w',
    label: 'Wired',
  },
  {
    value: 'y',
    label: 'Youthful',
  },
  {
    value: 'custom',
    label: 'Custom',
  },
]

export interface ICowOptions {
  text: string
  action: string //'think' | 'say'
  f?: string
  e?: string
  T?: string
  b?: boolean
  d?: boolean
  g?: boolean
  p?: boolean
  s?: boolean
  t?: boolean
  w?: boolean
  y?: boolean
}

export interface IFormCowsayOptions {
  text: string
  action: string
  mode: string
  eyes: string
  tongue: string
  cow: string
}

export const cowOptionsAtom = atomWithStorage<IFormCowsayOptions>(
  'cow-options',
  {
    text: 'Moo!',
    action: '',
    mode: '',
    eyes: '**',
    tongue: '()',
    cow: 'default',
  },
)
