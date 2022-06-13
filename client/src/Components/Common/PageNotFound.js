import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='PageNotFound'>
        <h2>Page Not Found!</h2>
        <h3>Kindly try this link:  <Link to = '/'>Home</Link></h3>
    </div>
  )
}

export default PageNotFound