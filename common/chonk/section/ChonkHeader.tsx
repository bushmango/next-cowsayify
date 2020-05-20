import css from './Section.module.scss'

export const ChonkHeader = (props: { children?: React.ReactNode }) => {
  return (
    <div className={css.chonkHeader}>
      <div className={css.chonkHeaderPrimary}>{props.children}</div>

      <div className={css.chonkHeaderShadow}>{props.children}</div>
    </div>
  )
}
