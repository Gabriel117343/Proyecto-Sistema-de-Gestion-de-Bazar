import React from 'react'

export const PanelAdmin = () => {
  return (
    <section className='container'>
      <div className="opciones-admin">
        <ul className='d-flex gap-5 align-items-center justify-content-center'>
          <li className=''>
            <div className="cuadro1">
              <i className='bi bi-shop'></i>

            </div>
            <p>Punto de Venta</p>
          </li>
          <li>
            <div className="cuadro2">
              <i className='bi bi-box-seam'></i>

            </div>
            
            <p className='text-center'>Inventario</p>
          </li>
          <li>
            <div className="cuadro3">
              <i className='bi bi-people'></i>

            </div>
            
            <p className='text-center'>Empleados</p>
          </li>
          <li>
            <div className="cuadro4">
              <i className='bi bi-gear'></i>

            </div>
            <p>Configuracion</p>
          </li>
        </ul>

      </div>
      


    </section>
  )
}
