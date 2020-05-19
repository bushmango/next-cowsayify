import { ICowOptions, TAction, IFormCowsayOptions } from './cowsay'

const host = '/api'

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

  requestSave: createDefault(),
  requestGetCow: createDefault(),
  requestGetHistory: createDefault(),
}

const stateManager = midboss.createMidboss('cowsay', '1.0.0', initialState, {})
export function useSubscribe() {
  return midboss.useSubscription(stateManager)
}

function init() {
  // Get our list of cows
  cowsay.list((err, result) => {
    if (!err) {
      stateManager.produce((draftState) => {
        draftState.cowList = result
      })
    }
  })
}
init()

export async function doShare() {
  let options = calcOptions()

  let result = await apiRequest.post<any>(
    host + '/cows/save',
    {
      options: JSON.stringify(options),
    },
    (rs) => {
      stateManager.produce((ds) => {
        ds.requestSave = rs
      })
    },
  )
  if (result.isSuccess) {
    let hk = result.response.hk
    navTo('/cowsaid/' + hk)
  }
}

// Convert our internal options into cowsay-specific options
export function calcOptions(): ICowOptions {
  let state = stateManager.getState()
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
    options[mode] = true
  }
  return options
}

export async function prefetchCow(key) {
  return await apiRequest.post<any>(
    host + '/cows/get/',
    { hk: key },
    (rs) => {},
  )
}

export async function fetchCow(key) {
  return await apiRequest.post<any>(
    host + '/cows/get/',
    {
      hk: key,
    },
    (rs) => {
      stateManager.produce((ds) => {
        ds.requestGetCow = rs
      })
    },
  )
}

export async function fetchHistory() {
  return await apiRequest.post<any>(host + '/cows/history/', {}, (rs) => {
    stateManager.produce((ds) => {
      ds.requestGetHistory = rs
    })
  })
}

export function setState(changes: Partial<IStateCowsay>) {
  stateManager.setState(changes)
}

export function updateMakeCowForm(field: keyof IFormCowsayOptions, newVal) {
  // console.log('changes', field, newVal)
  stateManager.produce((ds) => {
    ds.makeCowForm[field] = newVal
  })
}
