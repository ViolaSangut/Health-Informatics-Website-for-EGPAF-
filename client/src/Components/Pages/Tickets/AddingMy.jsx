import React from 'react'
import useRefreshToken from '../../hooks/useRefreshToken'

const AddingMy = () => {
  const refresh = useRefreshToken();
  return (
    <div>
      <h2>Test</h2>
      <button onClick={()=>refresh()}>Refresh</button>
    </div>
  )
}

export default AddingMy