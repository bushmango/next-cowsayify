import css from './Section.module.scss'

export const SectionTitle = (props: { children?: React.ReactNode }) => {
  return <div className={css.sectionTitle}>{props.children}</div>
}
