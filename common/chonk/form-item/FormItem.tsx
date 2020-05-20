import css from './FormItem.module.scss'

export const FormItem = (props: {
  children?: React.ReactNode
  label: React.ReactNode
}) => {
  return (
    <div className={css.formItem}>
      <div className={css.label}>{props.label}</div>
      <div>{props.children}</div>
    </div>
  )
}
