import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
      <div className='header-content'>
        
        <div className='nav-section'>

          <div className='nav-item'>
            <Link to="/" className='nav-link'>INICIO</Link>
            <div className='dropdown'>
              <Link to="/guia-tallas" className='dropdown-link'>GUIA DE TALLAS</Link>
            </div>
          </div>

          <div className='nav-item'>
            <Link to="/collection" className='nav-link'>PIEZAS</Link>
            <div className='dropdown horizontal'>
              <Link to="/collection/anillos" className='dropdown-link'>ANILLOS</Link>
              <Link to="/collection/colgantes" className='dropdown-link'>COLGANTES</Link>
              <Link to="/collection/pendientes" className='dropdown-link'>PENDIENTES</Link>
              <Link to="/collection/colecciones" className='dropdown-link'>COLECCIONES</Link>
            </div>
          </div>

        </div>

        <div className='logo-section'>
          <Link to='/'>
            <img src='/assets/spinning-icon.gif' alt='Rotating Logo' className='logo' />
          </Link>
        </div>

        <div className='nav-section'>
          <Link to='/contact' className='nav-link'>CONTACTO</Link>
          <Link to='/about' className='nav-link'>SOBRE MÍ</Link>
        </div>
      </div>
    </div>
  )
}