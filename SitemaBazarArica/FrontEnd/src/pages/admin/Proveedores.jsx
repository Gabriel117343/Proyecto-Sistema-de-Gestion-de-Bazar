import React from 'react'
import { BsPersonVcardFill } from "react-icons/bs"
import { TablaProveedoresContenedor } from '../../components/admin/proveedores/TablaProveedoresContenedor'
import { ProveedoresProvider } from '../../context/ProveedoresContext'
export const Proveedores = () => {
  return (
    <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
            <BsPersonVcardFill />
          </div>
          <h2 className='m-0'>Proveedores de Tienda</h2>
        </div>
        <ProveedoresProvider>{/* ProveedoresProvider es un componente que contiene el estado global de los proveedores */}
          <TablaProveedoresContenedor/> { /* TablaProveedoresContenedor es un componente que contiene la tabla de proveedores */}
        </ProveedoresProvider>
        
      </section>
  )
}
