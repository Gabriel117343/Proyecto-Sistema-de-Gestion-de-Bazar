import React, { useContext, useEffect, useState} from 'react'
import { ValidarProductos } from './TablaProductos'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import { ProductosContext } from '../../../context/ProductosContext'
import './styles.css'
import { Modal, Button } from 'react-bootstrap';
import { FormEdicion } from './FormEdicion'
import { FormRegistroProductos } from './FormRegistroProductos'
import { debounce } from 'lodash'
export const TablaProductosContenedor = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false); // Nuevo estado para la modal de registro

  const [productoBuscado, setProductoBuscado] = useState(null) // Nuevo estado para el input de busqueda
  const { stateProducto: { productos, productoSeleccionado }, eliminarProductoContext, getProductoContext, getProductosContext } = useContext(ProductosContext)

  useEffect(()=> {
    const cargar = () => {
      getProductosContext() // se ejecuta la funcion getProductos del contexto de los productos
    }
    cargar()
  }, [])
  console.log(productos)
  const borrarProducto = (id) => {
    async function confirmar () {
      const aceptar = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
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
          const { success, message } = await eliminarProductoContext(id)
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
  const edicionProducto = async (id) => {
    const { success, message } = await getProductoContext(id)
    if (success) {
      setShowModal(true)

    } else {
      toast.error(message)
    }
  }
  const cerrarModal = () => {
    setShowRegistroModal(false) // Cerrar la modal de registro
    setShowModal(false)
  }
  const cambiarFiltro = (event) => {
    setProductoBuscado(event.target.value) // se guarda el valor del input de busqueda en el estado productoBuscado
  }
  const debounceCambiarFiltro = debounce(cambiarFiltro, 300) // Debounce para retrazar la ejecucion de la funcion cambiarFiltro
  // Acciones extra
  const refrescarTabla = async () => {
    const toastId = toast.loading('Refrescando', {id: 'toastId'})
    const { success }  = await getProductosContext()
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
    <section className="pt-2">
      <div className="row d-flex mb-2">
        <div className="col-md-2">
          <button className="btn btn-primary btn-block" onClick={() => setShowRegistroModal(true)}><i class="bi bi-plus-circle-fill"></i> Nuevo</button>
        </div>
        <div className="col-md-10 d-flex align-items-center gap-2">
          <i className='bi bi-search'></i>
          <input className="form-control" type="text" placeholder="Buscar producto por nombre, precio, tipo, seccion, proveedor..." onChange={debounceCambiarFiltro} />
          <button className='btn btn-outline-primary' onClick={refrescarTabla}><i className="bi bi-arrow-repeat"></i></button>
          <button className='btn btn-outline-primary' onClick={imprimirTabla}><i class="bi bi-printer"></i></button>
        </div>
      </div>
      
      <ValidarProductos listaProductos={productos} borrarProducto={borrarProducto} edicionProducto={edicionProducto} filtro={productoBuscado}/>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className='bg-info'>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEdicion producto={productoSeleccionado} cerrarModal={cerrarModal}/>
        </Modal.Body>
      </Modal>
      <Modal show={showRegistroModal} onHide={() => setShowRegistroModal(false)}>
        <Modal.Header closeButton className='bg-info'>
          <Modal.Title>Registrar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistroProductos cerrarModal={cerrarModal}/>
        </Modal.Body>
      </Modal>
    </section>
  )
}
