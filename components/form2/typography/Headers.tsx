export const H1 = (props: { children: React.ReactNode }) => {
  return (
    <h1 className='text-lg font-medium leading-6 text-gray-900'>
      {props.children}
    </h1>
  )
}

export const Subheader = (props: { children: React.ReactNode }) => {
  return <p className='mt-1 text-sm text-gray-600'>{props.children}</p>
}
