import React from 'react'
import { ListaVentas } from '../../components/admin/ventas/ListaVentas'
export const Ventas = () => {
  return (
    <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '30px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
            <i class="bi bi-pass-fill"></i>
          </div>
          <h2 className='m-0'>Ventas Realizadas</h2>
        </div>
        <ListaVentas />
        
        

      </section>
  )
}
