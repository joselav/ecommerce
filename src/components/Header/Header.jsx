import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'
import '../../assets/fonts.css'

const Header = () => {
  return (
    <Link to="/" style={{textDecoration:"none"}}>
      <div className='header'>
        <h1>FunMug</h1>
      </div>
    </Link>
  )
}

export default Header