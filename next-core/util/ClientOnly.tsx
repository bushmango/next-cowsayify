import { useEffect, useState } from 'react'

export const ClientOnly = (props: { children: React.ReactNode }) => {
  let [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady) {
    return null
  }
  return <>{props.children}</>
}
