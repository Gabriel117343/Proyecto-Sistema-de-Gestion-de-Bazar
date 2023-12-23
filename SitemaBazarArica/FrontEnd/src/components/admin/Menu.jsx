import React, { useState, useContext } from 'react'
import { FaBars, FaHome, FaUserPlus, FaUsers } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import './Menu.css'

//MENU DE OPCIONES PARA EL ADMINISTRADOR
export const Menu = ({ children }) => {
  
  const [isOpen, setIsOpen] = useState(true)

  const toggle = () => setIsOpen(!isOpen)
  const { stateLogin: { usuario, isAuth } } = useContext(LoginContext)
  
  const menuItems  = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <i class="bi bi-speedometer"></i>
      
    },
    {
      path: '/admin/compras',
      name: 'Compras',
      icon: <i class="bi bi-basket2-fill"></i>
    },
    {
      path: '/admin/recibos',
      name: 'Recibos',
      icon: <i class="bi bi-receipt"></i>
    },
    {
      path: '/admin/devoluciones',
      name: 'Devoluciones',
      icon: <i class="bi bi-arrow-return-left"></i>
    },
    {
      path: '/admin/stocks',
      name: 'Stocks',
      icon: <i class="bi bi-box"></i>
    },
    {
      path: '/admin/ventas',
      name: 'Ventas',
      icon: <i class="bi bi-cart4"></i>
    },
    {
  
      name: 'Mantenimiento',

    },
    {
      path: '/admin/proveedores',
      name: 'Proveedores',
      icon: <i class="bi bi-truck"></i>
    },
    {
      path: '/admin/productos',
      name: 'Productos',
      icon: <i class="bi bi-bag"></i>
    },
    {
      path: '/admin/usuarios',
      name: 'Usuarios',
      icon: <i class="bi bi-people"></i>
    },
    {
      path: '/admin/secciones',
      name: 'Secciones',
      icon: <i class="bi bi-layers-fill"></i>
    },
    {
      path: '/admin/configuracion',
      name: 'Configuracion',
      icon: <i class="bi bi-gear"></i>
    }
  ]
  return (
    
    <div className='contenedor'>
      <div style={{width: isOpen ? "350px": "50px"}} className="sidebar">

        <div className="top_section pt-4">
          
          { isOpen ? (
            <div className='d-flex align-items-center gap-3 pb-3 ps-1'>
              { usuario && isAuth ? (
                <>
                  <img width='50px' height='50px' style={{display: isOpen ? "block": "none", borderRadius: '30px'}} className="logo " src={ usuario.imagen ? usuario.imagen : 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png'} />
                  <strong className='text-capitalize'>{usuario.nombre} {usuario.apellido}</strong> 
                </>
              ):
              (
                <>
                  <img width='50px' height='50px' style={{display: isOpen ? "block": "none", borderRadius: '30px'}} className="logo " src='https://cdn-icons-png.flaticon.com/512/6073/6073873.png' />
                  <strong>Sin Nombre</strong>
                </>
              )
            } 
            <div className="bars ms-5 py-2 mx-1">
              <FaBars onClick={toggle}/>

            </div>
          </div>
            
          )
          : (
            <div className="d-flex align-items-center justify-content-center py-2">
              <FaBars onClick={toggle}/>

            </div>
          )}
          {
            menuItems.map((item, index) => (
              <NavLink to={item.path} key={index} className="link">
                <div className="icon">{item.icon}</div>
                
                <div style={{display: isOpen ? "block": "none"}} className="link_text">{item.name}</div>
              </NavLink>
            ))
          }
          </div>

        
        </div>

        <main>{ children }</main> 

    </div>
  )
}
