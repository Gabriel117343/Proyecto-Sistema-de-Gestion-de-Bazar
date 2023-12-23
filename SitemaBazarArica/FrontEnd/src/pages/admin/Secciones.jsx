import React from 'react'
import { ListaSeccionesContenedor } from '../../components/admin/secciones/ListaSeccionesContenedor'
export const Secciones = () => {
  return (
    <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
            <i class="bi bi-layers-fill"></i><i className='bi bi-section-fill'></i>
          </div>
          <h2 className='m-0'>Secciones Registradas</h2>
        </div>
        <ListaSeccionesContenedor />
      </section>
  )
}
