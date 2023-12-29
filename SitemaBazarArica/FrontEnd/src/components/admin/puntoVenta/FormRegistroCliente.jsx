import React, { useContext } from 'react'
import { ClientesContext } from '../../../context/ClientesContext'
import swal from 'sweetalert2'
export const FormRegistroCliente = ({ cerrarModal }) => {
  const { crearClienteContext } = useContext(ClientesContext)
  const enviarFormulario = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const cliente = Object.fromEntries(formData)
    const { success, message } = await crearClienteContext(cliente)	
    if (success) {
      swal.fire({
        title: 'Cliente creado',
        text: message,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      cerrarModal()
    } else {
      swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }
  return (
    <form action="" onSubmit={enviarFormulario}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" className="form-control" name="nombre" id="nombre" placeholder="Ej: Juan Perez" />
      </div>
      <div className="form-group">
        <label htmlFor="apellido">Apellido</label>
        <input type="text" className="form-control" name="apellido" id="apellido" placeholder="Ej: Perez" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo</label>
        <input type="email" className="form-control" name="email" id="email" placeholder="Ej: cliente33@gmail.com" />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Telefono</label>
        <input type="text" className="form-control" name="telefono" id="telefono" placeholder="Ej: 12345678" />
      </div>
      <div className="form-group">
        <label htmlFor="rut">Rut</label>
        <input type="text" className="form-control" name="rut" id="rut" placeholder="Ej: 12345678-9" />
      </div>
      <div className="form-group">
        <label htmlFor="direccion">Direccion</label>
        <input type="text" className="form-control" name="direccion" id="direccion" placeholder="Ej: Calle 1 #123" />
      </div>
      <div className="d-flex justify-content-between gap-2 pt-3">
        <button type='button' className="btn btn-danger" onClick={cerrarModal}>Cancelar</button>
        <button className="btn btn-primary">Crear</button>
      </div>
    </form>
  )
}
