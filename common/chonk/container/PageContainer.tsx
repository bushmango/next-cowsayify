import css from './PageContainer.module.scss'

export const PageContainer = (props: { children: React.ReactNode }) => {
  return <div className={css.pageContainer}>{props.children}</div>
}
