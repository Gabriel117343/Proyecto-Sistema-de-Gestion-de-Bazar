
import React from 'react'

export const HeaderPuntoVenta = () => {
  return (
    <header className='tamaño-header'>
     
        <nav className='navbar fixed-top nav'>
          <div className='container align-items-center justify-content-between'>
          <div className="d-flex align-items-center gap-5 seleccion3">
              <i className='bi bi-grid-3x3-gap-fill'></i>
              <strong>Punto de Venta</strong>
            </div>
            <div className='d-flex gap-2 align-items-center'>
              <i className='bi bi-person-circle perfil-admin'></i>
              <p className='nombre-admin pt-3'>Juan</p>
              <p className='pt-3 ps-4'>Home</p>
            </div>
          </div>   
        </nav>

    </header>
  )
}
