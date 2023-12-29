import React, { useContext } from 'react'
import { ListaProductosContenedor } from '../../components/admin/puntoVenta/ListaProductosContenedor'
export const PuntoVenta = () => {

  return (
    <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '30px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
            <i class="bi bi-shop"></i>
          </div>
          <h2 className='m-0'>Realizar Ventas</h2>
        </div>
        <ListaProductosContenedor />

      </section>
  )
}
