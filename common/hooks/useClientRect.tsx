// see: https://reactjs.org/docs/hooks-faq.html
import { useCallback, useState } from 'react'

export function useClientRect(): [ClientRect, (node: HTMLDivElement) => void] {
  const [rect, setRect] = useState<ClientRect>((null as unknown) as ClientRect)
  const ref = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])
  return [rect, ref]
}
