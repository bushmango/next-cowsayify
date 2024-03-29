export function Panel(props: { children: React.ReactNode }) {
  return (
    <>
      {/* Be sure to use this with a layout container that is full-width on mobile */}
      <div className='bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:p-6'>{props.children}</div>
      </div>
    </>
  )
}
