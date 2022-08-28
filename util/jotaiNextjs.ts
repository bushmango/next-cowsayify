import { atom } from 'jotai'
import { atomWithHash, atomWithStorage } from 'jotai/utils'

let isServer = typeof window === 'undefined'

export function useNextjsAtomWithHash<T>(key: string, _default: T) {
  return isServer ? atom(_default) : atomWithHash(key, _default)
}

export function useNextjsAtomWithStorage<T>(key: string, _default: T) {
  return isServer ? atom(_default) : atomWithStorage(key, _default)
}
