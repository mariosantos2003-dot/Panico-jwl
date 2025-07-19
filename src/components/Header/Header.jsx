import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
        <div className='header-content'>
            <div className='nav-section'>
                <Link to="/" className='nav-link'>Inicio</Link>
                <Link to="/collection" className='nav-link'>Colección</Link>
            </div>
            
            <div className='logo-section'>
               <Link to='/'> <img src='/assets/rotating2.webp' alt='Rotating Logo' className='logo' /></Link>
            </div>
            
            <div className='nav-section'>
                <Link to='/contact' className='nav-link'>Contacto</Link>
                <Link to='/about' className='nav-link'>Sobre mi</Link>
            </div>
        </div>
    </div>
  )
}

export default Header