// tslint:disable:no-console

import { browser } from '../browser/browser-sidecar'
import { l } from '../lodash/lodash'

const defaultVolume = 500
const defaultNamespace = '*'
let loggingVolume = defaultVolume
let loggingNamespaces = [defaultNamespace]

export function setLoggingVolume(vol: number) {
  loggingVolume = vol
  if (browser.localStorageExists) {
    browser.getLocalStorage().setItem('logging:volume', '' + vol)
  }
}
export function getLoggingVolume() {
  return loggingVolume
}
export function setLoggingNamespaces(namespaces: string) {
  loggingNamespaces = l.map(namespaces.split(','), (c) => c.trim())
  if (browser.localStorageExists) {
    browser
      .getLocalStorage()
      .setItem('logging:namespaces', l.join(loggingNamespaces, ','))
  }
}
export function getLoggingNamespaces() {
  return l.join(loggingNamespaces, ', ')
}

export const log = (
  namespace: string | string[],
  message: string,
  ...args: any[]
) => {
  logLevel(namespace, 500, message, ...args)
}

export const logLevel = (
  namespace: string | string[],
  volume: number,
  message: string,
  ...args: any[]
) => {
  if (typeof console !== 'undefined') {
    if (loggingVolume >= volume) {
      if (areWeLoggingThisNamespace(namespace)) {
        if (args.length === 1 && l.isFunction(args[0])) {
          // Evaluate logging function
          args = [args[0]()]
        }
        console.log(namespace, volume, '|', message, ...args)
      }
    }
  }
}

export const logSuccess = (
  namespace: string | string[],
  message: string,
  ...args: any[]
) => {
  if (typeof console !== 'undefined') {
    if (areWeLoggingThisNamespace(namespace)) {
      console.log('SUCCESS', namespace, '|', message, ...args)
    }
  }
}

export const logWarn = (
  namespace: string | string[],
  message: string,
  ...args: any[]
) => {
  if (typeof console !== 'undefined') {
    if (areWeLoggingThisNamespace(namespace)) {
      console.warn(namespace, '|', message, ...args)
    }
  }
}

export const logInfo = (
  namespace: string | string[],
  message: string,
  ...args: any[]
) => {
  if (typeof console !== 'undefined') {
    if (areWeLoggingThisNamespace(namespace)) {
      console.info(namespace, '|', message, ...args)
    }
  }
}

export const logError = (
  namespace: string | string[],
  message: string,
  ...args: any[]
) => {
  if (typeof console !== 'undefined') {
    if (areWeLoggingThisNamespace(namespace)) {
      if (console.error) {
        console.error(namespace, '|', message, ...args)
      } else {
        console.log('ERROR', namespace, '|', message, ...args)
      }
    }
  }
}

export const createLogger = (namespace: string) => {
  return {
    x: (message: string, ...args: any[]) => log(namespace, message, ...args),
    log: (message: string, ...args: any[]) => log(namespace, message, ...args),
    debug: (message: string, ...args: any[]) =>
      logInfo(namespace, message, ...args),
    error: (message: string, ...args: any[]) =>
      logError(namespace, message, ...args),
    catastrophicError: (message: string, ...args: any[]) => {
      logError(namespace, message, ...args)
      throw new Error(namespace + ':' + message)
    },
  }
}

const areWeLoggingThisNamespace = (namespace: string | string[]): boolean => {
  if (loggingNamespaces.length === 0) {
    return false
  }
  if (namespace === '*') {
    return true
  }
  if (l.isString(namespace)) {
    return l.some(loggingNamespaces, (c) => c === namespace || c === '*')
  }
  return l.some(namespace, (c) => areWeLoggingThisNamespace(c))
}

loggingVolume = 1000
loggingNamespaces = []

// Load settings from local storage
if (browser.localStorageExists) {
  loggingVolume =
    parseInt(
      browser.getLocalStorage().getItem('logging:volume') || '' + defaultVolume,
      10,
    ) || defaultVolume
  loggingNamespaces = (
    browser.getLocalStorage().getItem('logging:namespaces') || defaultNamespace
  ).split(',')
}

// Allow changing of settings via query string e.g. ?volume=600&namespace=1,2,3
// if (windowExists) {
// 	let v = getQueryStringParam('volume')
// 	if (v) {
// 		setLoggingVolume(parseInt(v, 10) || defaultVolume)
// 	}
// 	let n = getQueryStringParam('namespaces')
// 	if (n != null) {
// 		setLoggingNamespaces(n)
// 	}
// }
