import React, { useId, useContext } from 'react'
import { ProveedoresContext } from '../../../context/ProveedoresContext'
import toast from 'react-hot-toast'
export const FormEdicion = ({ cerrarModal, proveedor }) => {

  const { id, nombre, persona_contacto, telefono, direccion, estado } = proveedor
  const { actualizarProveedor } = useContext(ProveedoresContext)
  const idFormAdmin = useId()
  const enviarFormulario = async (event) => {
    event.preventDefault()
    const formulario = new FormData(event.target)
    const estado = formulario.get('estado') === 'true'
    formulario.set('estado', estado)
    console.log(id)
    const { success, message } = await actualizarProveedor(id, formulario)
    if (success) {
      cerrarModal()
      toast.success(message)
    } else {
      cerrarModal()
      toast.error(message)
    }

  }
  return (
    <form onSubmit={enviarFormulario} id={`${idFormAdmin}-edicion-proveedor`}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" className="form-control" id="nombre" placeholder="Nombre del proveedor" name='nombre' defaultValue={nombre} required/>
      </div>
      <div className="form-group">
        <label htmlFor="personaContacto">Persona de contacto</label>
        <input type="text" className="form-control" id="persona_contacto" name='persona_contacto' placeholder="Persona de contacto" defaultValue={persona_contacto} required/>
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <input type="text" className="form-control" id="telefono" name='telefono' placeholder=" 93934374374" defaultValue={telefono} required/>
      </div>
      <div className="form-group">
        <label htmlFor="direccion">Dirección</label>
        <input type="text" className="form-control" id="direccion" name='direccion' placeholder="Avenida Iquique123.." defaultValue={direccion} required/>

      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select className="form-control" id="estado"  name="estado" defaultValue={estado}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <div className="d-flex justify-content-between pt-3">
        <button type='submit' className='btn btn-success'>Editar</button>
        <button type='button' className='btn btn-danger' onClick={cerrarModal}>Cancelar</button>
      </div>
    </form>
  )
}
