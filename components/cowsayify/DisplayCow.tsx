// import cowsay from 'cowsay-browser'
const cowsay = require('cowsay-browser')

import { ICowOptions } from '../state/cowsay'

export const DisplayCow = (props: { options: ICowOptions }) => {
  let { options } = props

  if (!options || !options.text) {
    options = {
      text: 'Whomp',
    } as any
  }

  let cowText: string =
    options.action === 'think' ? cowsay.think(options) : cowsay.say(options)

  // Basic cow scaling
  // Get max width
  let lines = cowText.split('\n')
  let maxLen = lines.reduce(
    (prev, cur) => (cur.length > prev ? cur.length : prev),
    1,
  )
  let scale = ''
  if (maxLen > 35) {
    scale = ' scale-75 sm:scale-100'
  }
  if (maxLen > 60) {
    scale = ' scale-50 sm:scale-75 md:scale-100'
  }
  if (maxLen > 95) {
    scale = ' scale-25 sm:scale-50 md:scale-75 lg:scale-100'
  }
  return (
    <div
      className={
        'm-4 max-w-7xl mx-auto sm:px-6 lg:px-8 bg-black text-white flex justify-center rounded-xl'
      }
    >
      <pre className={scale}>{cowText}</pre>
    </div>
  )
}
