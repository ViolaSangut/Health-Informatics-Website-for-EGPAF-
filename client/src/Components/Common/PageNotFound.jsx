import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
        <h2>Page Not Found!</h2>
        <h3>Kindly try this link:  <Link className='button' to = '/'>Home</Link></h3>
    </div>
  )
}

export default PageNotFound