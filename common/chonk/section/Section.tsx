import css from './Section.module.scss'

export const Section = (props: {
  label: string
  children?: React.ReactNode
}) => {
  return (
    <div className={css.section}>
      <div>Section: {props.label}</div>

      <div>{props.children}</div>
    </div>
  )
}
