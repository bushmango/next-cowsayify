import css from './Section.module.scss'
import { SectionTitle } from './SectionTitle'

export const Section = (props: {
  label: string
  children?: React.ReactNode
}) => {
  return (
    <div className={css.section}>
      <SectionTitle>{props.label}</SectionTitle>

      <div>{props.children}</div>
    </div>
  )
}
