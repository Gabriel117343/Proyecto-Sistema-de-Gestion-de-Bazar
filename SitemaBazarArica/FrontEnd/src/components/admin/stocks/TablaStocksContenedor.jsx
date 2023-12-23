import React, { useContext, useState, useEffect } from 'react'
import { StocksContext } from '../../../context/StocksContext'
import { ValidarStocks } from './TablaStocks'
import { toast } from 'react-hot-toast'
import { debounce } from 'lodash'
export const TablaStocksContenedor = () => {

  const { stateStock: { stocks }, getStocksContext } = useContext(StocksContext)
  const [stockBuscado, setStockBuscado] = useState(null) // Nuevo estado para el input de busqueda

  useEffect(() => {
    const cargar = () => {
      getStocksContext()
    }
    cargar()
  }, [])
  const cambiarFiltro = (e) => {
    setStockBuscado(e.target.value)
  }
  // Acciones extra
  const refrescarTabla = async () => {
    const toastId = toast.loading('Refrescando', {id: 'toastId'})
    const { success }  = await getStocksContext()
    if (success) {
      toast.dismiss(toastId, {id: 'toastId'})
      toast.success('Tabla refrescada')
    } else {
      toast.dismiss(toastId, {id: 'toastId'})
      toast.error('error al refrescar la Tabla')
    }
  }
  const imprimirTabla = () => {
    print()
  }
  const debounceCambiarFiltro = debounce(cambiarFiltro, 300) // Debounce para retrazar la ejecucion de la funcion cambiarFiltro
  return (
    <>
      <div className='d-flex gap-2 align-items-center pb-2'>
        <i className='bi bi-search'></i>
        <input className='form-control' type="text" placeholder="Buscar por nombre, proveedor, descripcion, stock..." onChange={debounceCambiarFiltro}/>
        <button className='btn btn-outline-primary' onClick={refrescarTabla}><i className="bi bi-arrow-repeat"></i></button>
        <button className='btn btn-outline-primary' onClick={imprimirTabla}><i class="bi bi-printer"></i></button>

      </div>
      <ValidarStocks listaStocks={stocks} filtro={stockBuscado}/>
    </>
  )
}
