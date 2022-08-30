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
        getItem: (key) => {
          let item = _default
          let itemJson = localStorage.getItem(key) || ''
          if (itemJson) {
            try {
              item = JSON.parse(itemJson) as T
            } catch (e) {
              console.error('useNextjsAtomWithStorage get', e)
            }
          }
          return item
        },
        setItem: (key, value) => {
          try {
            localStorage.setItem(key, JSON.stringify(value))
          } catch (e) {
            console.error('useNextjsAtomWithStorage set', e)
          }
        },
        removeItem: (key) => localStorage.removeItem(key),
        delayInit: true,
      })
}
