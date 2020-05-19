import { ICowOptions, TAction, IFormCowsayOptions } from './cowsay'
import { sos } from '../../common/sos/sos-sidecar'
import { apiRequest } from '../../common/request/apiRequest-sidecar'
import Router from 'next/router'
const cowsay = require('cowsay-browser')

const host = '/api'

export interface IApiRequestState<T> {
  isPrefetched?: boolean
  isFetching?: boolean
  isSuccess?: boolean
  response?: T
  error?: any
  startTime?: string
  endTime?: string
  requestId?: number
}

export interface IStateCowsay {
  makeCowForm: IFormCowsayOptions

  cowList: string[]

  requestSave: IApiRequestState<{ hk: string }>
  requestGetCow: IApiRequestState<{ item: { options: string } }>
  requestGetHistory: IApiRequestState<{
    result: {
      Items: {
        createdDateTime: string
        options: string
      }[]
    }
  }>
}

let initialState: IStateCowsay = {
  makeCowForm: {
    text: '',
    mode: '',
    eyes: '',
    tongue: '',
    action: 'say',
    cow: 'default',
  },

  cowList: [],

  requestSave: {},
  requestGetCow: {},
  requestGetHistory: {},
}

const getSos = sos.createLazySos<IStateCowsay>('sosCowsay', 1, () => ({
  cowList: { default: [] },
  requestSave: { default: {} },
  requestGetCow: { default: {} },
  requestGetHistory: { default: {} },
  makeCowForm: {
    default: {
      text: '',
      mode: '',
      eyes: '',
      tongue: '',
      action: 'say',
      cow: 'default',
    },
  },
}))

export const useSubscribe = sos.createUseSubscribe(getSos)

function init() {
  // Get our list of cows
  cowsay.list((err: any, result: any) => {
    if (!err) {
      getSos().change((ds) => {
        ds.cowList = result
      })
    }
  })
}
init()

export async function doShare() {
  let options = calcOptions()
  let result = await apiRequest.post<any>(
    '/api/cows/save',
    {
      options: JSON.stringify(options),
    },
    (rs) => {
      getSos().change((ds) => {
        ds.requestSave = rs
      })
    },
  )
  if (result.isSuccess) {
    let hk = result.response.hk
    Router.push('/cowsaid/' + hk)
  }
}

// Convert our internal options into cowsay-specific options
export function calcOptions(): ICowOptions {
  let state = getSos().getState()
  let { makeCowForm } = state
  let { text, mode } = makeCowForm

  if (text.length === 0) {
    text = 'Moo'
  }

  let options: ICowOptions = {
    text,
    action: makeCowForm.action,
  }
  if (makeCowForm.cow && makeCowForm.cow !== 'default') {
    options.f = makeCowForm.cow
  }
  if (mode === 'custom') {
    if (makeCowForm.eyes) {
      options.e = makeCowForm.eyes
      if (options.e.length === 1) {
        options.e += ' '
      }
    }
    if (makeCowForm.tongue) {
      options.T = makeCowForm.tongue
      if (options.T.length === 1) {
        options.T += ' '
      }
    }
  } else if (mode) {
    ;(options as any)[mode] = true
  }
  return options
}

export async function prefetchCow(key: string) {
  // return await apiRequest.post<any>(
  //   host + '/cows/get/',
  //   { hk: key },
  //   (rs) => {},
  // )
}

export async function fetchCow(key: string) {
  return await apiRequest.post<any>(
    '/api/cows/get',
    {
      hk: key,
    },
    (rs) => {
      getSos().change((ds) => {
        ds.requestGetCow = rs
      })
    },
  )
}

export async function fetchHistory() {
  return await apiRequest.post<any>('/api/cows/history', {}, (rs) => {
    getSos().change((ds) => {
      ds.requestGetHistory = rs
    })
  })
}

export function setState(changes: Partial<IStateCowsay>) {
  // getSos().setState(changes)
}

export function updateMakeCowForm(
  field: keyof IFormCowsayOptions,
  newVal: string,
) {
  // console.log('changes', field, newVal)
  getSos().change((ds) => {
    ds.makeCowForm[field] = newVal
  })
}
