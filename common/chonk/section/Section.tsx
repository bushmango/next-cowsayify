import css from './Section.module.scss'
import { SectionTitle } from './SectionTitle'

export const Section = (props: {
  label: string
  children?: React.ReactNode
  inverted?: boolean
}) => {
  let className = css.section
  if (props.inverted) {
    className += ' ' + css.inverted
  }

  return (
    <div className={className}>
      <SectionTitle>{props.label}</SectionTitle>

      <div>{props.children}</div>
    </div>
  )
}
