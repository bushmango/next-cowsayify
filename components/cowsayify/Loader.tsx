import React from 'react'

export const Loader = (props: { isLoading?: boolean }) => {
  return <div>{props.isLoading !== false && <div>Loading!</div>}</div>
}
