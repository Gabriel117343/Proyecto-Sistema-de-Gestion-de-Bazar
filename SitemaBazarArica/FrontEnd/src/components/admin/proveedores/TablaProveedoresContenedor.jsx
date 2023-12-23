import React, { useContext, useEffect, useState} from 'react'
import swal from 'sweetalert2'

import { toast } from 'react-hot-toast'
import { ProveedoresContext } from '../../../context/ProveedoresContext'
import { Modal, Button } from 'react-bootstrap';
import { FormEdicion } from './FormEdicion'
import { FormRegistroProveedores } from './FormRegistroProveedores'
import { ValidarProveedores } from './TablaProveedores'
import { debounce } from 'lodash'
import './styles.css'
export const TablaProveedoresContenedor = () => {
  const [showModal, setShowModal] = useState(false)
  const [showRegistroModal, setShowRegistroModal] = useState(false) // Nuevo estado para la modal de registro

  const [proveedorBuscado, setProveedorBuscado] = useState(null) // Nuevo estado para el input de busqueda
  const { stateProveedor: { proveedores, proveedorSeleccionado }, eliminarProveedor, getProveedorContext, getProveedoresContext } = useContext(ProveedoresContext)

  useEffect(()=> {
    const cargar = () => {
      getProveedoresContext() // se ejecuta la funcion getProveedores del contexto de los proveedores
    }
    cargar()
  }, [])

  const borrarProveedor = (id) => {
    async function confirmar () {
      const aceptar = await swal.fire({
        title: '¿Estás seguro?',
        text: 'Al eliminar el Proveedor se eliminaran todos sus productos asociados',
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
          const { success, message } = await eliminarProveedor(id)
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
  const edicionProveedor = async (id) => {
    const { success, message } = await getProveedorContext(id)
    if (success) {
      console.log(proveedorSeleccionado)
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
    setProveedorBuscado(event.target.value)
  }
  const debounceCambiarFiltro = debounce(cambiarFiltro, 300) // Debounce para que no se ejecute la funcion cada vez que se escribe una letra
   // Acciones extra
   const refrescarTabla = async () => {
    const toastId = toast.loading('Refrescando', {id: 'toastId'})
    const { success }  = await getProveedoresContext()
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
          <button className='btn btn-primary animacion-boton' onClick={() => setShowRegistroModal(true)}><i class="bi bi-plus-circle-fill"></i> Nuevo</button>

        </div>
        <div className='col-md-10 d-flex gap-2 align-items-center'>
          <i className='bi bi-search'></i>
          <input className='form-control' type="text" placeholder="Buscar por nombre, persona de contacto, telefono..." onChange={debounceCambiarFiltro}/>
          <button className='btn btn-outline-primary' onClick={refrescarTabla}><i className="bi bi-arrow-repeat"></i></button>
          <button className='btn btn-outline-primary' onClick={imprimirTabla}><i class="bi bi-printer"></i></button>
        </div>
      </div>
      <ValidarProveedores listaProveedores={proveedores} borrarProovedor={borrarProveedor} edicionProveedor={edicionProveedor} filtro={proveedorBuscado}/>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className='bg-info'>
          <Modal.Title>Editar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEdicion cerrarModal={cerrarModal} proveedor={proveedorSeleccionado}/>
        </Modal.Body>

      </Modal>
      <Modal show={showRegistroModal} onHide={() => setShowRegistroModal(false)}>
        <Modal.Header closeButton className='bg-info'>
          <Modal.Title>Registrar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistroProveedores cerrarModal={cerrarModal} />
        </Modal.Body>
      </Modal>
     
    </section>
  )
}
