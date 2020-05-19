import React from 'react'
import { browser } from '../browser/browser-sidecar'
import { deepFreeze } from '../deepFreeze/deepFreeze'
import { l } from '../lodash/lodash'
import { logInfo, logWarn } from '../log/log'
import { r } from '../ramda/ramda'

const namespace = 'sos'

// TODO:
// Http requests
// Big data
export interface IStateMetaItem<T> {
  localStorage?: boolean
  default: T
}

export type IStateMeta<T> = {
  [key in keyof T]: IStateMetaItem<T[key]>
}

export type StateCallbackType<T> = (state: T) => void

export interface ISos<T> {
  getSosKey: () => string
  subscribe: (callback: StateCallbackType<T>) => StateCallbackType<T>
  unsubscribe: (callback: StateCallbackType<T>) => void
  getState: () => T
  change: (producer: (state: T) => void) => void
  replace: (state: T) => void
  patchShallow: (partialState: Partial<T>) => void
  patchDeep: (partialState: Partial<T>) => void
  getStats: () => ISosStats
}
export interface ISosStats {
  sosKey: string
  numUpdates: number
  numSubscriptionUpdates: number
  numSubscriptions?: number
  totalUpdateMs: number
  minUpdateMs: number
  maxUpdateMs: number
  averageUpdateMs: number
}

const registeredSoses: ISos<any>[] = []
// Export to console
const _global = global as any

const ensureSosKeyIsNotAlreadyRegistered = (sosKey: string) => {
  if (r.find((c: ISos<any>) => c.getSosKey() === sosKey, registeredSoses)) {
    throw new Error(
      `This sos key is already registered! Please use a unique one for your sos. ${sosKey}`,
    )
  }
}

// Load sos on-demand, should speed up performance and help reduce circular dependencies
export type LazySosType<T> = () => ISos<T>
export const createLazySos = <T>(
  sosKey: string,
  version: number,
  metaMaker: () => IStateMeta<T>,
): LazySosType<T> => {
  ensureSosKeyIsNotAlreadyRegistered(sosKey)

  let _sos: ISos<T> | null = null
  return () => {
    if (!_sos) {
      let meta = metaMaker()
      _sos = createSos(sosKey, version, meta)
    }
    return _sos
  }
}

export const createSos = <T>(
  sosKey: string,
  version: number,
  meta: IStateMeta<T>,
  options?: { immediateUpdate: boolean },
): ISos<T> => {
  ensureSosKeyIsNotAlreadyRegistered(sosKey)

  const getSosKey = () => sosKey

  const stats: ISosStats = {
    sosKey,
    maxUpdateMs: 0,
    minUpdateMs: 0,
    totalUpdateMs: 0,
    averageUpdateMs: 0,
    numUpdates: 0,
    numSubscriptionUpdates: 0,
    numSubscriptions: 0,
  }

  let initialState: any = r.map(r.prop('default'), meta as any)

  // Load from local storage
  if (browser.localStorageExists) {
    try {
      let stored = browser.getLocalStorage().getItem('sos:' + sosKey)
      if (stored) {
        let parsed = JSON.parse(stored)
        if (parsed && parsed.version === version) {
          let data = parsed.state
          let keys = Object.keys(meta)
          r.forEach((k: string) => {
            let v: IStateMeta<any> = (meta as any)[k] as IStateMeta<any>
            if (v && v.localStorage && r.not(r.isNil(data[k]))) {
              initialState[k] = data[k]
            }
          }, keys)
        }
      }
    } catch (err) {
      logWarn(sosKey, `sos ${sosKey} local storage corrupted`)
    }
  }

  let _state: T
  const _setState = (newState: T) => {
    stats.numUpdates++
    _state = deepFreeze(newState)
  }
  _setState(initialState as T)

  let saveStateToLocalStorage = l.debounce(() => {
    if (browser.localStorageExists) {
      let state = getState()
      let toSave: any = {}
      let keys = r.keys(meta) as any
      r.forEach((k: string) => {
        let v: IStateMeta<any> = (meta as any)[k] as IStateMeta<any>
        if (v.localStorage) {
          toSave[k] = (state as any)[k]
        }
      }, keys)

      browser
        .getLocalStorage()
        .setItem('sos:' + sosKey, JSON.stringify({ version, state }, null, 2))
    }
  }, 500)

  let subscriptions: Array<(state: T) => void> = []
  const subscribe = (callback: (state: T) => void) => {
    subscriptions.push(callback)
    if (subscriptions.length > 10) {
      logWarn(
        sosKey,
        `sos ${sosKey} has ${subscriptions.length} subscriptions, possible leak`,
      )
    }
    return callback
  }
  const unsubscribe = (callback: (state: T) => void) => {
    subscriptions = r.reject(r.equals(callback), subscriptions)
  }
  const callSubscriptions = () => {
    stats.numSubscriptionUpdates++
    let start = Date.now()
    r.forEach((c: any) => c(_state), subscriptions)
    let elapsedMs = Date.now() - start
    stats.totalUpdateMs += elapsedMs
    if (elapsedMs > stats.maxUpdateMs) {
      stats.maxUpdateMs = elapsedMs
    }
    if (elapsedMs < stats.minUpdateMs) {
      stats.minUpdateMs = elapsedMs
    }
    if (elapsedMs > 10) {
      logWarn(
        sosKey,
        `sos ${sosKey} took ${elapsedMs} ms to update ${subscriptions.length} subscriptions`,
      )
    }
    saveStateToLocalStorage()
  }
  const getState = () => _state
  let timerId: any = 0
  const replace = (state: T) => {
    // Make sure there's a change
    let isSame = r.equals(_state, state)
    if (r.not(isSame)) {
      _setState(state)

      if (options && options.immediateUpdate) {
        callSubscriptions()
      } else {
        if (timerId) {
          clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
          callSubscriptions()
        }, 1000 / 120)
      }
    }
  }
  const change = (producer: (state: T) => void) => {
    let draftState = r.clone(_state)
    producer(draftState)
    replace(draftState)
  }
  const patchShallow = (partialState: Partial<T>) => {
    let newState = r.mergeLeft(partialState, _state as any) as T
    replace(newState)
  }
  const patchDeep = (partialState: Partial<T>) => {
    let newState = r.mergeDeepLeft(partialState, _state as any) as T
    replace(newState)
  }

  const getStats = () => {
    return r.mergeLeft(
      {
        numSubscriptions: subscriptions.length,
        averageUpdateMs: stats.numSubscriptionUpdates
          ? stats.totalUpdateMs / stats.numSubscriptionUpdates
          : 0,
      },
      stats,
    )
  }

  const sos = {
    getSosKey,
    getState,
    change,
    replace,
    patchShallow,
    patchDeep,
    subscribe,
    unsubscribe,
    getStats,
  }
  registeredSoses.push(sos)
  // Export to console
  if (!_global[sosKey]) {
    _global[sosKey] = sos
  }
  return sos
}

// Debugging
export const reportStats = () => {
  logInfo(namespace, 'sos stats')
  logInfo(namespace, 'registered ' + registeredSoses.length)
  r.forEach((c: ISos<any>) => {
    let info = c.getStats()
    logInfo(namespace, 'stats', info)
  }, registeredSoses)
}

// React hook
export function useSubscription<T>(sos: ISos<T>) {
  const [state, setState] = React.useState(sos.getState())
  const handleStateChange = (newState: T) => {
    setState(newState)
  }
  React.useEffect(() => {
    sos.subscribe(handleStateChange)
    return () => {
      sos.unsubscribe(handleStateChange)
    }
  }, [sos])

  return state
}

export const createUseSubscribe = <T>(getSos: LazySosType<T>) => {
  return () => useSubscription(getSos())
}
