import React, { useContext, useEffect, useState } from 'react'
import { ValidarUsuarios } from './TablaUsuarios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { UsuariosContext } from '../../../context/UsuariosContext'
import './styles.css'
import { Modal, Button } from 'react-bootstrap';
import { FormularioEdicion } from './FormularioEdicion'
import { FormRegistroUsuarios } from './FormRegistroUsuarios'
import { debounce } from 'lodash'
export const TablaUsuariosContenedor = () => {

  const [showModal, setShowModal] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false); // Nuevo estado para la modal de registro
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [usuarioBuscado, setUsuarioBuscado] = useState('') // Nuevo estado para el input de busqueda
  
  const { stateUsuario: {usuarios}, deleteUsuario, getUsuario, getUsuarios } = useContext(UsuariosContext)
  useEffect(() => {
    getUsuarios()    
  }, [])
  
  const borrarPersona = (id) => {
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
          const { success, message } = await deleteUsuario(id)
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

  const edicionUsuario = async (id) => {
   
    const usuario = await getUsuario(id)
    setUsuarioSeleccionado(usuario);
    setShowModal(true)

    
  }

  const cerrarModal = () => {
    setShowRegistroModal(false) // Cerrar la modal de registro
    setShowModal(false) // Cerrar la modal de edicion
  }
  const cambiarFiltro = (event) => {
    setUsuarioBuscado(event.target.value)
  }
  const debounceCambiarFiltro = debounce(cambiarFiltro, 300) // Debounce para retrazar la ejecucion de la funcion cambiarFiltro
  // Acciones
  const refrescarTabla = async () => {
    const toastId = toast.loading('Refrescando', {id: 'toastId'})
    const { success }  = await getUsuarios()
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
    <section className='pt-2'>
      <div className="row d-flex mb-2">
        <div className="col-md-2">
          <button className='btn btn-primary animacion-boton' onClick={() => setShowRegistroModal(true)}><i class="bi bi-plus-circle-fill"></i> Nuevo</button>
          

        </div>
        <div className="col-md-10 d-flex gap-2 align-items-center">
          <i class="bi bi-search"></i>
          <input className='form-control' type="text" placeholder="Buscar por nombre, apellido, edad, telefono, rut, email..." onChange={debounceCambiarFiltro}/>
          <button className='btn btn-outline-primary' onClick={refrescarTabla}><i className="bi bi-arrow-repeat"></i></button>
          <button className='btn btn-outline-primary' onClick={imprimirTabla}><i class="bi bi-printer"></i></button>
        </div>
      </div>
      
      <ValidarUsuarios listaPersonas={usuarios} borrarPersona={borrarPersona} edicionUsuario={edicionUsuario} filtro={usuarioBuscado}/>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className='bg-info'>
          <Modal.Title>Editar Usuario</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          {/* Aquí va tu formulario de edición. Puedes pasar usuarioSeleccionado como prop a tu formulario */}
          <FormularioEdicion usuario={usuarioSeleccionado} cerrarModal={cerrarModal}/>
        </Modal.Body>
      </Modal>
      <Modal show = {showRegistroModal} onHide={() => setShowRegistroModal(false)}>
        <Modal.Header closeButton className='bg-info'>
          <Modal.Title>Registrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistroUsuarios cerrarModal={cerrarModal} />
        </Modal.Body>
      </Modal>


    </section>
  );
  // return (
  //   <section className='pt-2'>
  //     <ValidarUsuarios listaPersonas={stateUsuario.usuarios} borrarPersona={borrarPersona} edicionUsuario={edicionUsuario}/>

  //   </section>
  // )
}
