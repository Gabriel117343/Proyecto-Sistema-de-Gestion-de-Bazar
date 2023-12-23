import React, { useContext, useEffect, useState} from 'react'
import { ValidarSecciones } from './ListaSecciones'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import { SeccionesContext } from '../../../context/SeccionesContext'
import './styles.css'
import { Modal, Button } from 'react-bootstrap';
import { FormEdicion } from './FormEdicion'
import { FormRegistroSecciones } from './FormRegistroSecciones'
import { debounce } from 'lodash'

export const ListaSeccionesContenedor = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false); // Nuevo estado para la modal de registro
  const [seccionBuscada, setSeccionBuscada] = useState(null) // Nuevo estado para el input de busqueda
  const { stateSeccion: { secciones, seccionSeleccionada }, eliminarSeccionContext, getSeccionContext, getSeccionesContext, actualizarSeccionContext, crearSeccionContext } = useContext(SeccionesContext)
  
  useEffect(() => {
    const cargar = () => {
      getSeccionesContext() // se ejecuta la funcion getProductos del contexto de los productos
    }
    cargar()
  }, [])
  console.log(secciones)
  const borrarSeccion = (id) => {
    async function confirmar() {
      const aceptar = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminaran todos los productos asociados a esta Seccion',
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
          const { success, message } = await eliminarSeccionContext(id)
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
  const edicionSeccion = async (id) => {
    const { success, message } = await getSeccionContext(id)
    if (success) {
      setShowModal(true)

    } else {
      toast.error(message)
    }
  }
  const cerrarModal = () => {
    setShowModal(false)
    setShowRegistroModal(false) // Cerrar la modal de registro
  }
  const cambiarFiltro = (event) => {
    event.preventDefault()
    const filtro = event.target.value
    setSeccionBuscada(filtro) // Guarda el nuevo filtro en el estado
  }
  const debounceCambiarFiltro = debounce(cambiarFiltro, 300) // retrasa la ejucion de la funcion cambiar filtro por 300 milisegundos
  // ACCIONES EXTRA ------------------
  const refrescarTabla = async () => {
    const toastId = toast.loading('Actualizando tabla...', { id: 'loading' })
    const { success } = await getSeccionesContext()
    if (success ) {
      toast.dismiss(toastId, { id: 'loading' })
      toast.success('Tabla actualizada')
    } else {
      toast.dismiss(toastId, { id: 'loading' })
      toast.error('Error al actualizar la tabla')
    }
  }
  const imprimirTabla = () => {
    print()
  }
  
  return (
    <section className='pt-2'>
      <div className="row">
        <div className="col-md-2">
          <button onClick={() => setShowRegistroModal(true)} className='btn btn-primary'><i className="bi bi-plus-lg"></i> Nueva</button>
          
        </div>
        <div className="col-md-10 d-flex align-items-center gap-3">
          <i className='bi bi-search'></i>
          <input onChange={debounceCambiarFiltro} className='form-control' type="text" placeholder='Buscar por nombre, numero, descripcion...' />
          <button className='btn btn-outline-primary' onClick={refrescarTabla}><i className="bi bi-arrow-repeat"></i></button>
          <button className='btn btn-outline-primary' onClick={imprimirTabla}><i class="bi bi-printer"></i></button>
        </div>
      </div>
      <ValidarSecciones listaSecciones={secciones} borrarSeccion={borrarSeccion} edicionSeccion={edicionSeccion} filtro={seccionBuscada} /> 
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Seccion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEdicion cerrarModal={cerrarModal} seccion={seccionSeleccionada} actualizarSeccion={actualizarSeccionContext}/>
        </Modal.Body>
      </Modal>

      <Modal show={showRegistroModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Seccion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistroSecciones cerrarModal={cerrarModal } crearSeccion={crearSeccionContext}/>
        </Modal.Body>

      </Modal>
    </section>
  )
}
