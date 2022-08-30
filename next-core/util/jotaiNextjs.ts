import { atom } from 'jotai'
import { atomWithHash, atomWithStorage } from 'jotai/utils'

let isServer = typeof window === 'undefined'

export function useNextjsAtomWithHash<T>(key: string, _default: T) {
  return isServer ? atom(_default) : atomWithHash(key, _default)
}

export function useNextjsAtomWithStorage<T>(key: string, _default: T) {
  return isServer
    ? atom(_default)
    : atomWithStorage(key, _default, {
        getItem: (key) => JSON.parse(localStorage.getItem(key) || '') as T,
        setItem: (key, value) =>
          localStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => localStorage.removeItem(key),
        delayInit: true,
      })
}
