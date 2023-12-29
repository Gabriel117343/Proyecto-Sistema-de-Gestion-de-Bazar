import React from 'react'
import { BsInboxesFill } from "react-icons/bs"
import './Pages.css'
import { PedidosProvider } from '../../context/PedidosContext'
import { TablaPedidosContenedor } from '../../components/admin/compras/TablaPedidosContenedor'
import { ProveedoresProvider } from '../../context/ProveedoresContext'
import { StocksProvider } from '../../context/StocksContext'
export const Compras = () => {

  return (
    <>
      

  
      <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '30px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
            <BsInboxesFill />
          </div>
          <h2 className='m-0'>Ordenes de compra</h2>

        </div>
        <StocksProvider>
          <ProveedoresProvider>{/** se pasa el contexto */}
            <PedidosProvider>
              <TablaPedidosContenedor />

            </PedidosProvider>
          </ProveedoresProvider>

        </StocksProvider>
        
  
        

      </section>
      
      

    </>
  )
}

