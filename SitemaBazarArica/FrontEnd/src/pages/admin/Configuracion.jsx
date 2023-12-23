import React from 'react'
import { FormConfiguracionCuenta } from '../../components/admin/configuracion/FormConfiguracionCuenta'
import './pages.css'
export const Configuracion = () => {
  return (
    <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '35px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
            <i class="bi bi-person-bounding-box"></i>
          </div>
          <h2 className='m-0'>Configuracion de la Cuenta</h2>
        </div>
        <FormConfiguracionCuenta/>
        

      </section>
  )
}
