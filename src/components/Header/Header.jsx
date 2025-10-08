import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
      <div className='header-content'>
        
        <div className='nav-section'>

          <div className='nav-item'>
            <Link to="/" className='nav-link'>Inicio</Link>
            <div className='dropdown'>
              <Link to="/guia-tallas" className='dropdown-link'>Guia de tallas</Link>
            </div>
          </div>

          <div className='nav-item'>
            <Link to="/collection" className='nav-link'>Colección</Link>
            <div className='dropdown horizontal'>
              <Link to="/collection/anillos" className='dropdown-link'>Anillos</Link>
              <Link to="/collection/colgantes" className='dropdown-link'>Colgantes</Link>
              <Link to="/collection/pendientes" className='dropdown-link'>Pendientes</Link>
            </div>
          </div>

        </div>

        <div className='logo-section'>
          <Link to='/'>
            <img src='/assets/Pánico_Full_Render_Display.webp' alt='Rotating Logo' className='logo' />
          </Link>
        </div>

        <div className='nav-section'>
          <Link to='/contact' className='nav-link'>Contacto</Link>
          <Link to='/about' className='nav-link'>Sobre mí</Link>
        </div>
      </div>
    </div>
  )
}