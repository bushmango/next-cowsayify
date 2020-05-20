import { Button } from '../button/Button'

export const Section = (props: {
  label: string
  children?: React.ReactNode
}) => {
  return (
    <div>
      <div>Section: {props.label}</div>

      <div>{props.children}</div>
    </div>
  )
}

export const ChonkExamplesPage = () => {
  return (
    <div>
      Examples!
      <Section label='Buttons'>
        <Button>a button</Button>
        <Button round>a rounded button</Button>
      </Section>
    </div>
  )
}
