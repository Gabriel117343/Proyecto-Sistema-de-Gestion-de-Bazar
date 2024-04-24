import React, { useId, useContext } from 'react'
import { toast } from 'react-hot-toast'
import debounce  from 'lodash/debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // icono eye para usar en input contraseña
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import confetti from 'canvas-confetti' // efecto de confetti
import { ProveedoresContext } from '../../../context/ProveedoresContext'

export const FormRegistroProveedores = ({ cerrarModal }) => {
  // cambiar el boton en true o false con isBtnDisabled


  const { stateProveedor: { proveedores }, crearProveedor } = useContext(ProveedoresContext)
  const idFormAdmin = useId()

  const enviarFormulario = async (event) => {
    event.preventDefault()
    toast.loading('Registrando proveedor...', { id: 'loading' })

    const formulario = new FormData(event.target)
    // Convertir el estado a booleano
    const estado = formulario.get('estado') === 'true'
    console.log(estado)
    formulario.set('estado', estado)

    const { success, message } = await crearProveedor(formulario)
    if (success) {
      toast.dismiss('loading', { id: 'loading' })
      toast.success(message)
      confetti()
      event.target.reset()
      cerrarModal()
    } else {
      toast.dismiss('loading')
      toast.error(message)
      cerrarModal()
    }
  }
  return (
    <form onSubmit={enviarFormulario} id={`${idFormAdmin}-proveedor`}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" className="form-control" id="nombre" placeholder="Nombre del proveedor" name='nombre' required/>
      </div>
      <div className="form-group">
        <label htmlFor="personaContacto">Persona de contacto</label>
        <input type="text" className="form-control" id="persona_contacto" name='persona_contacto' placeholder="Persona de contacto" required/>
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <input type="text" className="form-control" id="telefono" name='telefono' placeholder=" 93934374374" required/>
      </div>
      <div className="form-group">
        <label htmlFor="direccion">Dirección</label>
        <input type="text" className="form-control" id="direccion" name='direccion' placeholder="Avenida Iquique123.." required/>

      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select className="form-control" id="estado"  name="estado" defaultValue='true'>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <div className="d-flex justify-content-between pt-3">
        <button type='submit' className='btn btn-success'>Registrar</button>
        <button type='button' className='btn btn-danger' onClick={cerrarModal}>Cancelar</button>
      </div>
    </form>
  )
}








// class Proveedor(models.Model): # esto significa que cuando se agrege un producto se debe seleccionar un proveedor
//     nombre = models.CharField(max_length=100) # nombre del proveedor
//     persona_contacto = models.CharField(max_length=100, blank=True, null=True) # persona de contacto del proveedor
//     telefono = models.CharField(max_length=15)
//     direccion = models.CharField(max_length=50)
//     estado = models.BooleanField(default=True)
//     # Otros campos relacionados con el proveedor
//     def __str__(self):
//         return self.nombre
// https://github.com/Gabriel117343
