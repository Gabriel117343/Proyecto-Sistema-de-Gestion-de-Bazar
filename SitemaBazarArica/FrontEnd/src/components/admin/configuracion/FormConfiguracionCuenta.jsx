import React, { useContext, useId, useState, useRef, useEffect } from 'react'
import { InformacionUsuario } from './InformacionUsuario'
import { LoginContext } from '../../../context/LoginContext'
import { UsuariosContext } from '../../../context/UsuariosContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // icono eye para usar en input contraseña
import Swal from 'sweetalert2'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast'
import './configuracion.css'
import { set } from 'lodash'
export const FormConfiguracionCuenta = () => {
  const { stateLogin: { usuario }, obtenerUsuarioLogeado } = useContext(LoginContext) // destructuring del usuario del estado global
  const { updateUsuario } = useContext(UsuariosContext) // destructuring de la funcion updateUsuario del contexto de los usuarios
  const imagenInicial = usuario && usuario.imagen ? usuario.imagen : 'https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free.png' // si el usuario tiene una imagen se guarda en la variable imagenInicial, si no tiene imagen se guarda null'
  const [usuarioImagen, setUsuarioImagen]  = useState(imagenInicial) // estado para la imagen del usuario
  
  const [mostrarContraseña1, setMostrarContraseña1] = useState(false) // estado para mostrar la contraseña
  const [mostrarContraseña2, setMostrarContraseña2] = useState(false) // estado para mostrar la contraseña

  const formImagenId = useId()
  const formContraseñaId = useId()

  const formImagenRef = useRef() // referencia para el input de la imagen
  const formContraseñaRef = useRef() // referencia para el input de la contraseña
  const cambiarImagenPerfil = async (event) => {
    event.preventDefault()
    const imagen = event.target[0].files[0] // obteniendo la imagen del input
    const formData = new FormData() // creando un formData para enviar la imagen al servidor
    formData.append('imagen', imagen) // agregando la imagen al formData
    const toastId = toast.loading('Cargando imagen...') // toast para mostrar el mensaje de cargando imagen
    const { success, message } = await updateUsuario(usuario.id, formData) // enviando la imagen al servidor
    if (success) {
      toast.dismiss(toastId, {id: 'loading'}) // cerrando el toast de cargando imagen
      toast.success(message) // mostrando el mensaje de exito
      const token = localStorage.getItem('token') // obteniendo el token del localStorage
      obtenerUsuarioLogeado(token) // actualizando el usuario logeado en el estado global
   
    } else {
      toast.dismiss(toastId, {id: 'loading'}) // cerrando el toast de cargando imagen
      toast.error(message) // mostrando el mensaje de error
      formImagenRef.current.reset() // reseteando el input de la imagen
    }
  }
  const handleFileChange = (e) => { // esto es para la imagen

    if (e.target.files[0]) {
      setUsuarioImagen(URL.createObjectURL(e.target.files[0]));; // esto crea una url de la imagen
    }
  }
  // Form contraseña
  const cambiarContraseña = async(event) => {
    event.preventDefault()
    const validacion = Object.fromEntries(new FormData(event.target))
    const formData = new FormData
    formData.append('password', validacion.contraseña)
    const toastId = toast.loading('Cargando...', { id: 'loading' })
    if (validacion.contraseña !== validacion.contraseñaValidacion) { // validando que las contraseñas coincidan
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      toast.error('Las contraseñas no coinciden')
      return
    } else {
     

        const { success, message } = await updateUsuario(usuario.id, formData)
        if (success) {
          toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
          Swal.fire({
            icon: 'success',
            title: 'Contraseña cambiada correctamente',
            text: message,
            showConfirmButton: false,
            timer: 2500
          })
          formContraseñaRef.current.reset()

        } else {
          toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
          Swal.fire({
            icon: 'error',
            title: 'Error al cambiar la contraseña',
            text: message,
            showConfirmButton: false,
            timer: 1500
          })
          formContraseñaRef.current.reset()
          
        }
      }
      
    
  }
  const estadoContraseña1 = () => {
    setMostrarContraseña1(prevState => !prevState)
  }
  const estadoContraseña2 = () => {
    setMostrarContraseña2(prevState => !prevState)
  }
  return (
    <div className="row mt-2">
      <div className="col-md-6">
        <div className="column">
          <div className="col-md-12">
            <div className="card card-diseño">
            <div className="card-body">
              <h2>Cambiar imagen de perfil</h2>
              <form id={formImagenId} onSubmit={cambiarImagenPerfil} ref={formImagenRef}>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Nueva imagen de Perfil</label>
                  <input onChange={handleFileChange} className="form-control" type="file" name='imagen' required/>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="card card-diseño">
              <div className="card-body">
                <form className={formContraseñaId} onSubmit={cambiarContraseña} ref={formContraseñaRef}>
                  <h2>Cambiar contraseña</h2>
                  <div className="mb-3 contraseña-cont">
                    <label htmlFor="formFile" className="form-label"> Contraseña</label>
                    <input className="form-control" type={mostrarContraseña1 ? 'text' : 'password'} name='contraseña' required/>
                    <span className='icon'>
                        <FontAwesomeIcon style={{width: '20px', height: '25px'}}
                          icon={mostrarContraseña1 ? faEyeSlash : faEye}
                          onClick={estadoContraseña1}
                        />
                      </span>
                  </div>
                  <div className="mb-3 contraseña-cont">
                    <label htmlFor="formFile" className="form-label">Confirmar Contraseña</label>
                    <input className="form-control" type={mostrarContraseña2 ? 'text' : 'password'} name='contraseñaValidacion'  required/>
                    <span className='icon'>
                        <FontAwesomeIcon style={{width: '20px', height: '25px'}}
                          icon={mostrarContraseña2 ? faEyeSlash : faEye}
                          onClick={estadoContraseña2}
                        />
                      </span>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary">Guardar</button>
                  </div>
                </form>
              </div>
            </div>
              
          </div>
          
        </div>
    
      </div>
      <div className="col-md-6">
        <InformacionUsuario usuario={usuario} usuarioImagen={usuarioImagen}/>
        
      </div>
    </div>
  )
}
