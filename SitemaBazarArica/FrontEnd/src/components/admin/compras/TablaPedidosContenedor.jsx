import React, { useContext, useState, useEffect } from 'react'
import { PedidosContext } from '../../../context/PedidosContext'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import { ValidarPedidos } from './TablaPedidos'
import { debounce } from 'lodash'
import { FormOrdenCompra } from './FormOrdenCompra'
import { StocksContext } from '../../../context/StocksContext'
import { Recibir } from './Recibir'
export const TablaPedidosContenedor = () => {
  const [pedidoBuscado, setPedidoBuscado] = useState(null) // Nuevo estado para el input de busqueda
  const { statePedido: { pedidos }, getPedidosContext, eliminarPedidoContext, recibirPedidoContext } = useContext(PedidosContext)
  const { stateStock: { stocks }, recibirStockContext } = useContext(StocksContext)
  const [formularioActivo, setFormularioActivo] = useState(false) // Nuevo estado para la modal de registro
  useEffect(() => {
    const cargar = () => {
      getPedidosContext() // se ejecuta la funcion getProductos del contexto de los productos
    }
    cargar()
  }, [formularioActivo, pedidos]) // se ejecuta la funcion cargar al renderizar el componente
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
  const recibirPedido = async (pedido) => {
    // swal para confirmar que se recibira el pedido
    if (pedido.estado === 'recibido') {
      Swal.fire({
        title: 'Pedido Recibido',
        text: 'El pedido ya ha sido recibido',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6', //
      })
      return
    }
    const aceptar = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se recibira el pedido seleccionado, no se podra deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, recibir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6', //
      cancelButtonColor: '#d33'
    })
    if (!aceptar.isConfirmed) return // si no se confirma la accion se cancela la funcion
    
    
    const { success, message } = await recibirPedidoContext(pedido.id)
    if (success) {
      Swal.fire({
        title: 'Pedido Recibido',
        text: 'El pedido ha sido recibido exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6', //
      })

      for (let i = 0; i < pedido.productos.length; i++) { // agrega el stock a cada producto del pedido
        const producto = pedido.productos[i];
        const stock = stocks.find(stock => stock.producto.id === producto.id) // busca el stock del producto
        const cantidad = producto.cantidad
        await recibirStockContext(stock.id, cantidad)
        
        
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6', //
        
      })
    }
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
        <ValidarPedidos listaPedidos={pedidos} borrarPedido={eliminarPedido} filtro={pedidoBuscado} recibirPedido={recibirPedido}/>
        
      </>
     )
  )
}
