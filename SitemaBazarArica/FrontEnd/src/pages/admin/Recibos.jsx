import React from 'react'
import { FaTruckRampBox } from "react-icons/fa6"
export const Recibos = () => {
  return (
    <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
            <FaTruckRampBox />
          </div>
          <h2 className='m-0'>Ordenes Recibidas</h2>
        </div>
        
        

      </section>
  )
}
