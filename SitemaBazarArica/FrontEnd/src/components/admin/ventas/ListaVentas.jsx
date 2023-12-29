import React, { useContext, useEffect, useState } from 'react'
import { VentasContext } from '../../../context/VentasContext'
import { ClientesContext } from '../../../context/ClientesContext'
import { toast } from 'react-hot-toast'
export const ListaVentas = () => {
  const { stateVenta: { ventas }, getVentasContext } = useContext(VentasContext)
  const { stateCliente: { clientes }, getClientesContext } = useContext(ClientesContext)
  const [ventasFiltradas, setVentasFiltradas] = useState(ventas)
  useEffect(() => {
    const cargar = async () => {
      getVentasContext()
      getClientesContext()
    }
    cargar()
  }, [])
  console.log(ventas)
  console.log(clientes)
  const filtroCliente = (event) => {
    const cliente = event.target.value
    if (cliente === 'all') {
      setVentasFiltradas(ventas)
      return
    }
    
  }
  const refrescarTabla = () => {
    setVentasFiltradas(ventas)
    toast.success('Tabla actualizada')
  }
  const imprimirTabla = () => {
    print()
  }
  return (
    <div>
      <div className="d-flex align-items-center gap-2">
        
        <i className="bi bi-search"></i>
        <input type="text" onChange={filtroCliente} className='form-control mb-2' placeholder='Buscar por cliente' />
        <button className='btn btn-outline-primary' onClick={refrescarTabla}><i className="bi bi-arrow-repeat"></i></button>
        <button className='btn btn-outline-primary' onClick={imprimirTabla}><i class="bi bi-printer"></i></button>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Venta ID</th>
            <th>Total</th>
            <th>Fecha de Venta</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>RUT</th>
            <th>Teléfono</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {ventas?.map(venta => {
            const cliente = clientes.find(cliente => cliente.id === venta.cliente);
            return (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.total}</td>
                <td>{new Date(venta.fecha_venta).toLocaleDateString()}</td>
                {cliente ? (
                  <>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.apellido}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.rut}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.direccion}</td>
                  </>
                ) : (
                  <td colSpan="6">No se encontró información del cliente</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
