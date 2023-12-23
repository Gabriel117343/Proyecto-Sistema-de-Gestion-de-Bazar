
import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'
import './views.css'
export const HeaderAdmin = () => {
  const { cerrarSesion, stateLogin: { token } } = useContext(LoginContext)
  const navigate = useNavigate()

  const cerrarSesionActual = async() => {
    const { success, message } = await cerrarSesion(token)
    console.log(success)
    if (success) {
      toast.success(message)
      localStorage.removeItem('token')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } else {
      toast.error(message)
    }
  
  }
  return (
    <header className='tamaño-header'>
    
        <nav className='navbar fixed-top nav' style={{width: '100%'}}>
          <div className='container-fluid ps-3 align-items-center justify-content-between'>
            <div className="d-flex align-items-center gap-2 seleccion3">
              <i className='bi bi-grid-3x3-gap-fill'></i>
              <h3 className='m-0 ps-2'>Panel de Administrador</h3>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center seleccion3">
                <i className='bi bi-box-arrow-left text-whitt'></i>
                <button onClick={cerrarSesionActual} className='btn link text-white'>Cerrar Sesión</button>
              </div>
            </div>

          </div>

       
        </nav>
 
    </header>
    
  )
}
