import Router from 'next/router'
import { apiRequest } from '../../common/request/apiRequest-sidecar'
import { sos } from '../../common/sos/sos-sidecar'
import { ICowOptions, IFormCowsayOptions } from './cowsay'
export const cowsay = require('cowsay-browser')

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

const getSos = sos.createLazySos<IStateCowsay>('sosCowsay', 1, () => ({
  requestSave: { default: {} },
  requestGetCow: { default: {} },
  requestGetHistory: { default: {} },
}))

export const useSubscribe = sos.createUseSubscribe(getSos)

export async function doShare(formOptions: IFormCowsayOptions) {
  let options = calcOptions(formOptions)
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
    Router.push('/cow/' + hk)
  }
}

// Convert our internal options into cowsay-specific options
export function calcOptions(formOptions: IFormCowsayOptions): ICowOptions {
  let { text, mode, action, cow, eyes, tongue } = formOptions

  if (text.length === 0) {
    text = 'Moo'
  }

  let options: ICowOptions = {
    text,
    action: action,
  }
  if (cow && cow !== 'default') {
    options.f = cow
  }
  if (mode === 'custom') {
    if (eyes) {
      options.e = eyes
      if (options.e.length === 1) {
        options.e += ' '
      }
    }
    if (tongue) {
      options.T = tongue
      if (options.T.length === 1) {
        options.T += ' '
      }
    }
  } else if (mode) {
    ;(options as any)[mode] = true
  }
  return options
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

// export function updateMakeCowForm(
//   field: keyof IFormCowsayOptions,
//   newVal: string,
// ) {
//   // console.log('changes', field, newVal)
//   getSos().change((ds) => {
//     ds.makeCowForm[field] = newVal
//   })
// }
