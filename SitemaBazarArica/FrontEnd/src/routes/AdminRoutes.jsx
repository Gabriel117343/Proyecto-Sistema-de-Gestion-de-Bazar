import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


import { HeaderAdmin } from '../views/HeaderAdmin'
// PAGINAS DEL ADMINISTRADOR
import { Dashboard } from '../pages/admin/Dashboard'
import { Compras } from '../pages/admin/Compras'
import { Recibos } from '../pages/admin/Recibos'
import { Devoluciones } from '../pages/admin/Devoluciones'
import { Stocks } from '../pages/admin/Stocks'
import { Ventas } from '../pages/admin/Ventas'
import { Proveedores } from '../pages/admin/Proveedores'
import { Productos } from '../pages/admin/Productos'
import { Usuarios } from '../pages/admin/Usuarios'
import { Configuracion } from '../pages/admin/Configuracion'
import { UsuariosProvider } from '../context/UsuariosContext'
import { SeccionesProvider } from '../context/SeccionesContext'
import { ProductosPedidosProvider } from '../context/ProductosPedidosContext'
import { PuntoVenta } from '../pages/admin/PuntoVenta'
import { Secciones } from '../pages/admin/Secciones'
import { StocksProvider } from '../context/StocksContext'
// MENU DE OPCIONES PARA EL ADMINISTRADOR
import { Menu } from '../components/admin/Menu'
export const AdminRoutes = () => {
  return (
    <StocksProvider>
      <ProductosPedidosProvider>
        <SeccionesProvider>
          <UsuariosProvider>
            <HeaderAdmin />
              <Menu>
            
              <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='*' element={<Navigate to='/admin/dashboard' />} /> {/* si no se encuentra la ruta se redirecciona a dashboard */}
                <Route path='/compras' element={<Compras />} />
                <Route path='/recibos' element={<Recibos />} />
                <Route path='/devoluciones' element={<Devoluciones />} />
                <Route path='/stocks' element={<Stocks />} />
                <Route path='/ventas' element={<Ventas />} />
                <Route path='/punto-venta' element={<PuntoVenta />} />
                <Route path='/proveedores' element={<Proveedores />} />
                <Route path='/productos' element={<Productos />} />
                <Route path='/usuarios' element={<Usuarios />} />
                <Route path='/secciones' element={<Secciones />} />
                <Route path='/configuracion' element={<Configuracion />} />
              </Routes>

            </Menu>
          
          </UsuariosProvider>
        
        </SeccionesProvider>

      </ProductosPedidosProvider>
      
    </StocksProvider>
    
    
    
    
  )
}
