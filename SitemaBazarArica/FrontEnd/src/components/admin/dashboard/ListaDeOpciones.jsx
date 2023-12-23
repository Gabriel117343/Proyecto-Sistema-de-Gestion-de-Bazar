import React, { useContext, useEffect } from 'react'
import './styless.css'
import { UsuariosContext } from '../../../context/UsuariosContext'
import { StocksContext } from '../../../context/StocksContext'
export const ListaDeOpciones = () => {
  const { stateUsuario: { usuarios }, getUsuarios } = useContext(UsuariosContext)
  const { stateStock: { stocks }, getStocksContext } = useContext(StocksContext)
  const usuariosContados = usuarios?.length
  useEffect(() => {
    const cargar = () => {
      getUsuarios() // llamando a la funcion para obtener los usuarios
      getStocksContext() // llamando a la funcion para obtener los stocks
    }
    cargar()
  }, [])
  const stocksContados = stocks.map((stock) => stock.cantidad).reduce((a, b) => a + b, 0) // sumando los stocks
  return (
    <>
      <article className='d-flex flex-wrap gap-3'>
        <div className='tamaño-card'>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body color-card-1 text-white">
                
                <div className="row">
                  <div className="col-md-9">
                    <h4>Ordenes de Compra</h4>
                    <p> Total</p>
                  </div>
                  <div className="col-md-3 d-flex align-items-end justify-content-end">
                    <h3 className="p-0 m-0">0</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='tamaño-card'>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body color-card-3 text-white">
                
                <div className="row">
                  <div className="col-md-8">
                    <h4>Ordenes Recibidas</h4>
                    <p>Total</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-end justify-content-end">
                    <h3 className="p-0 m-0">0</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='tamaño-card'>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body color-card-2 text-white">
                
                <div className="row">
                  <div className="col-md-8">
                    <h4>Devoluciones</h4>
                    <p>Total</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-end justify-content-end">
                    <h3 className="p-0 m-0">0</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='tamaño-card'>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body color-card-4 text-white">
                
                <div className="row">
                  <div className="col-md-8">
                    <h4>Usuarios</h4>
                    <p>Total</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-end justify-content-end">
                    <h3 className="p-0 m-0">{usuariosContados ? usuariosContados : 0}</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='tamaño-card'>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body color-card-1 text-white">
                
                <div className="row">
                  <div className="col-md-8">
                    <h4>Stock en Tienda</h4>
                    <p>Total</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-end justify-content-end">
                    <h3 className="p-0 m-0">{stocksContados}</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='tamaño-card'>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body color-card-4 text-white">
                
                <div className="row">
                  <div className="col-md-8">
                    <h4>Ventas</h4>
                    <p>Total</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-end justify-content-end">
                    <h3 className="p-0 m-0">0</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
    
                

      </article>
    </>
  )
}
