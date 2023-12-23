import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
export const FormRegistroSecciones = ({ cerrarModal, crearSeccion }) => {
  const imagenIncial = '../../../public/images/seccion-productos.jpg'
  const [vistaImagen, setVistaImagen] = useState(imagenIncial) // estado para la vista previa de la imagen
  
  const enviarFormulario = async (event) => {
    event.preventDefault()
    const toastId = toast.loading('Cargando...', { id: 'loading' })
    const formData = new FormData(event.target)
    const { success, message } = await crearSeccion(formData)
    if (success) {
      toast.dismiss(toastId, { id: 'loading' })
      toast.success(message)
      cerrarModal()
    } else {
      toast.dismiss(toastId, { id: 'loading' })
      toast.error(message)
      cerrarModal()
    }
  }
  const cambiarVistaImagen = (event) => {
    setVistaImagen(URL.createObjectURL(event.target.files[0])) // esto crea una url de la imagen
  }
  return (
    <form action="" onSubmit={enviarFormulario}>
      <div>
        <img style={{ width: '100%', height: '200px' }} src={vistaImagen} alt="esto es una imagen de una seccion" className='rounded' />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input className='form-control' type="text" name='nombre' />
      </div>
      <div className="form-group">
        <label htmlFor="numero">Numero</label>
        <input className='form-control' type="number" name='numero' />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripcion (Opcional)</label>
        <textarea style={{ maxHeight: '180px' }} className='form-control' name="descripcion" id="" cols="30" rows="10"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="imagen">Imagen (Opcional)</label>
        <input className='form-control' type="file" name='imagen' onChange={cambiarVistaImagen}/>
      </div>
      <div className="d-flex justify-content-between pt-2">
        <button className='btn btn-primary'>Guardar</button>
        <button type='button' onClick={cerrarModal} className='btn btn-danger'>Cancelar</button>
      </div>
    </form>
  )
}
