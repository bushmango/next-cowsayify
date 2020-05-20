import css from './Banner.module.scss'

export const Banner = (props: {
  label: React.ReactNode
  children?: React.ReactNode
}) => {
  return (
    <div className={css.banner}>
      <div className={css.stripe} />
      <div className={css.label}>{props.label}</div>
    </div>
  )
}
