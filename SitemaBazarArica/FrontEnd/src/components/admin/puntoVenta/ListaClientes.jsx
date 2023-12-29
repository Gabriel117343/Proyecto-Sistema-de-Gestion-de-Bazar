import React, { useContext } from 'react'
import { ClientesContext } from '../../../context/ClientesContext'
import { toast } from 'react-hot-toast'
export const ListaClientes = ({ clientes, cerrarModal }) => {
  const { getClienteContext } = useContext(ClientesContext)
  console.log(clientes)

  const seleccionarCliente = async (id) => {
    const { success } = await getClienteContext(id)
    if (success) {
      toast.success('Cliente seleccionado')
      cerrarModal()
    } else {
      toast.error('Error al seleccionar el cliente')
    }
  }
  return (
    <article>
      <h2 className='text-center'>Lista de clientes</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rut</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.rut}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => seleccionarCliente(cliente.id)}>Seleccionar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </article>
  )
}
