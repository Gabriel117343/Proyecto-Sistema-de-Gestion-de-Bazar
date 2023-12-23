import React from 'react'
import { TablaProductosContenedor } from '../../components/admin/productos/TablaProductosContenedor'
import { ProveedoresProvider } from '../../context/ProveedoresContext'
export const Productos = () => {
  return (
    <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '35px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
            <i class="bi bi-boxes"></i>
          </div>
          <h2 className='m-0'>Agregar Productos</h2>
        </div>
        <ProveedoresProvider>
          <TablaProductosContenedor />

        </ProveedoresProvider>
        

      </section>
  )
}
