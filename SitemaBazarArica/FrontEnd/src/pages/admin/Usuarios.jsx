import React from 'react'
import { TablaUsuariosContenedor } from '../../components/admin/usuarios/TablaUsuariosContenedor'
export const Usuarios = () => {
  return (
    <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '35px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
          <i class="bi bi-people-fill"></i>
          </div>
          <h2 className='m-0'>Gestionar Usuarios</h2>
        </div>
        <TablaUsuariosContenedor />
        
        

      </section>
  )
}
