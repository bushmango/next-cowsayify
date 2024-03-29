import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { cowsay } from '../state/sosCowsay'

//export const cowListAtom = atomWithStorage<string[]>('cow-list', [])
export const cowListAtom = atom<string[]>([])

const namespace = 'cow-list-loader'
export const CowListLoader = () => {
  let [cowList, setCowList] = useAtom(cowListAtom)
  console.log(namespace, 'render')
  useEffect(() => {
    if (cowList.length < 1) {
      console.log(namespace, 'loading cows')

      cowsay.list((err: any, result: any) => {
        console.log(namespace, 'loaded', !!!err, result)
        if (!err) {
          setCowList(result)
        }
      })
    }
  }, [cowList])

  return null
}
