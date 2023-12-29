import React, { useContext, useEffect, useState } from 'react'
import { ProductosContext } from '../../../context/ProductosContext'
import { toast } from 'react-hot-toast'
import { ValidarProductos } from './ListaProductos'
import './puntoVenta.css'
export const ListaProductosContenedor = () => {
  const { stateProducto: { productos, productoSeleccionado }, getProductosContext } = useContext(ProductosContext)

  useEffect(() => {
    const cargar = async () => {
      const { success } = await getProductosContext()
      if (success) {
        toast.success('Productos cargados')
      } else {
        toast.error('Error al cargar los productos')
      }
    }
    cargar()
  }, [])
  console.log(productos)

  // 
  return (
    <section>
   
      <ValidarProductos listaProductos={productos} />

    </section>
  )
}
