import React, { useContext, useState, useEffect } from 'react'
import { PedidosContext } from '../../../context/PedidosContext'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import { ValidarPedidos } from './TablaPedidos'
import { debounce } from 'lodash'
import { FormOrdenCompra } from './FormOrdenCompra'
export const TablaPedidosContenedor = () => {
  const [pedidoBuscado, setPedidoBuscado] = useState(null) // Nuevo estado para el input de busqueda
  const { statePedido: { pedidos }, getPedidosContext, eliminarPedidoContext } = useContext(PedidosContext)
  const [formularioActivo, setFormularioActivo] = useState(false) // Nuevo estado para la modal de registro
  useEffect(() => {
    const cargar = () => {
      getPedidosContext() // se ejecuta la funcion getProductos del contexto de los productos
    }
    cargar()
  }, [])
  const eliminarPedido = (id) => {
    console.log(id)
    async function confirmar() {
      const aceptar = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminara el pedido seleccionado, no se podra deshacer esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6', //
        cancelButtonColor: '#d33'
      })
      if (aceptar.isConfirmed) {
        toast.loading('Eliminando...', { duration: 2000 })
        setTimeout(async () => {
          const { success, message } = await eliminarPedidoContext(id)
          if (success) {
            toast.success(message)
          } else {
            toast.error(message)
          }
        }, 2000)
      }
    }
    confirmar()
  }
  const cambiarFiltro = (event) => {
    setPedidoBuscado(event.target.value) // se guarda el valor del input en el estado
  }
  const debounceCambiarFiltro = debounce(cambiarFiltro, 300) // se crea una funcion debounced para no hacer tantas peticiones al servidor
  const cambiarSeleccionForm = () => {
    setFormularioActivo(!formularioActivo)
  }
  // ACCIONES EXTRA
  const refrescarTabla = async () => {
    const toastId = toast.loading('Refrescando', {id: 'toastId'})
    const { success }  = await getPedidosContext()
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
  return (
     formularioActivo ?
     (
      <FormOrdenCompra volver={cambiarSeleccionForm}/>
     )
     :
     (
      <>
        <div className="row d-flex mb-2">
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={cambiarSeleccionForm}> <i className='bi bi-plus-circle-fill'></i> Nuevo Pedido</button>
          </div>
          <div className="col-md-10 d-flex align-items-center justify-content-center gap-2">
            <i className='bi bi-search'></i>
            <input type="text" className="form-control" placeholder="Buscar Pedido" onChange={debounceCambiarFiltro} />
            <button className='btn btn-outline-primary' onClick={refrescarTabla}><i className="bi bi-arrow-repeat"></i></button>
            <button className='btn btn-outline-primary' onClick={imprimirTabla}><i class="bi bi-printer"></i></button>
          </div>
        </div>
        <ValidarPedidos listaPedidos={pedidos} borrarPedido={eliminarPedido} filtro={pedidoBuscado} />
        
      </>
     )
  )
}
