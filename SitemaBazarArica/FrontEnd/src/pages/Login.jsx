import React, { useState, useId, useEffect, useContext, useRef } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import debounce from 'lodash/debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // icono eye para usar en input contraseña
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { LoginContext } from '../context/LoginContext'
// importar sweetalert2
import Swal from 'sweetalert2'

// const navigate = useNavigate();

export const Login = () => {

  const { cerrarSesion, iniciarSesion, stateLogin: {isAuth} } = useContext(LoginContext) 
  const [btnisDisabled, setBtnisDisabled] = useState(false)
  const [mostrarContraseña, setMostrarContraseña] = useState(false)
  const idFormLogin = useId() // id para el form de login

  const formLoginRef = useRef() // referencia al form de login

  useEffect(() => {
    async function cerrar () {
      console.log(isAuth)
      if (isAuth) {
        console.log('Borrando Token...')
        await cerrarSesion() // Elimina el token del estado global
        localStorage.removeItem('token'); // Elimina el token del localstorage
      } else {
        return
        
      }
    }
    cerrar()
  }, [])
 

  
  
  const navigate = useNavigate()
  const enviarFormLogin = async (event) => { 
    event.preventDefault()
    setBtnisDisabled(true)
    const usuario = Object.fromEntries(new FormData(event.target))
    const toastId = toast.loading('Cargando...', { id: 'loading' })
      
      const { success, message, tipo, rol } = await iniciarSesion(usuario)
      console.log(success)
      console.log(message)
      console.log(tipo)
      console.log(rol)
      // success es un booleano que indica si la peticion fue exitosa o no
      // message es el mensaje que se muestra en el toast
      // tipo es el tipo de error que se muestra en el toast
   
      toast.dismiss(toastId) // cerrar el toast de cargando
      if (success) {
        console.log('asdf')
        setBtnisDisabled(false)
        toast.dismiss(toastId, { id: 'loading'}) // cerrar el toast de cargando
        toast.success(message)
        setTimeout(() => {
          if (rol === 'administrador') {
            toast.dismiss(toastId) // cerrar el toast de cargando
            navigate('/admin/dashboard')
          } else if (rol === 'vendedor') {
            navigate('/vendedor')
          }

        }, 1500)

      } else if (tipo === 'credenciales') {
        // limpiar formulario
        formLoginRef.current.reset()
        toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
        setBtnisDisabled(false)
        Swal.fire({
          icon: 'error',
          title: 'Credenciales Invalidas',
          text: message,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        })


      } else if (tipo === 'cuenta') {
        // limpiar formulario
        formLoginRef.current.reset()
        setBtnisDisabled(false)
        toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
        setBtnisDisabled(false)
        Swal.fire({
          icon: 'error',
          title: 'Cuenta Inactiva',
          text: message,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        })
      } else if (tipo === 'horario') {
        // limpiar formulario
        formLoginRef.current.reset()
        setBtnisDisabled(false)
        toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
        setBtnisDisabled(false)
        Swal.fire({
          icon: 'error',
          title: 'Restriccion de Horario',
          text: message,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        })
      } else {
        // limpiar formulario
        formLoginRef.current.reset()
        setBtnisDisabled(false)
        toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
        setBtnisDisabled(false)
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesion',
          text: 'Hubo un error al iniciar sesion, porfavor intentelo de nuevo.',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        })
      }
    }
  
  // Activa o desactivar la visualizacion de la contraseña atravez del estado anterior
  const estadoContraseña = () => {
    setMostrarContraseña(prevState => !prevState)
  }
  
  return (
    <section className="gradient-custom">
      <div className="container py-5" style={{height: '110vh'}}>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white efecto-login" style={{ borderRadius: '1rem' }}>
              <div className="card-body px-4 pb-4 text-center">

                <div>
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  
                  <div className='mb-3'>
                    <img style={{width:'100%'}} src="../public/images/login-imagen.png" alt="" />
                    
                  </div>
                  <p className="text-white-50 pt-2">Porfavor inicia sesion!</p>
                  
                  <form onSubmit={enviarFormLogin} id={idFormLogin} ref={formLoginRef}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id={`${idFormLogin}-email`}
                        className="form-control form-control-lg"
                        placeholder="Email"
                        name='email'        
                      />
                    </div>
                    <div className="form form-white mb-4 contraseña-container">
                      <input
                        id={`${idFormLogin}-password`}
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name='password'
                        type={mostrarContraseña ? 'text' : 'password'}
                      />
                      <span className='icon'>
                        <FontAwesomeIcon style={{width: '25px', height: '25px'}}
                          icon={mostrarContraseña ? faEyeSlash : faEye}
                          onClick={estadoContraseña}
                        />
                      </span>
                    </div>
                    <p  className="small mb-3 pb-lg-2"><Link to='/form-envio-correo' className="text-white-50">Olvidaste tu contraseña?</Link></p>
                    
                    <button type='submit' className="btn form-control btn-outline-light btn-lg px-5 mb-3" disabled={btnisDisabled}>Login</button>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

