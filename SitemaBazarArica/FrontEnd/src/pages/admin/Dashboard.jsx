import React from 'react'
import { FcShop } from "react-icons/fc"
import { ListaDeOpciones } from '../../components/admin/dashboard/ListaDeOpciones'
import { StocksProvider } from '../../context/StocksContext'
import { PedidosProvider } from '../../context/PedidosContext'
import './Pages.css'
export const Dashboard = () => {

  return (
    <>
      

  
      <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0 ms-2'>
            <FcShop />
          </div>
          <h1 className='m-0'>Sistema de Gestion para el Bazar</h1>

        </div>
        <PedidosProvider>
          <StocksProvider>
            <ListaDeOpciones />

          </StocksProvider>

        </PedidosProvider>
        
        
        
      </section>
      
      

    </>
  )
}


