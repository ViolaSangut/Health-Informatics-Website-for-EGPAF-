import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'

const Unauthorized = () => {
  return (
    <div className='pageNotFound'>
        <h2>Unauthorized!</h2>
        <h3>Kindly try this link:  <Link className='button' to = '/'>Home</Link></h3>
    </div>
  )
}

export default Unauthorized