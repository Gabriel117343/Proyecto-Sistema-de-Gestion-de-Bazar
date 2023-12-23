import React, { useId, useContext, useEffect, useState } from 'react'
import { ProductosContext } from '../../../context/ProductosContext'
import { ProveedoresContext } from '../../../context/ProveedoresContext'
import { SeccionesContext } from '../../../context/SeccionesContext'
import toast from 'react-hot-toast'

export const FormEdicion = ({ cerrarModal, producto}) => {
  const { id, nombre, seccion, proveedor, precio, stock, estado, imagen } = producto
  const { actualizarProductoContext } = useContext(ProductosContext)
  const { stateProveedor: { proveedores }, getProveedoresContext } = useContext(ProveedoresContext)
  const { stateSeccion: { secciones }, getSeccionesContext } = useContext(SeccionesContext)
  const imagenIncial = imagen ? imagen : '../../../public/images/seccion-productos.jpg'
  const [ vistaImagen, setVistaImagen ] = useState(imagenIncial) // estado para la vista previa de la imagen

  useEffect(()=> {
    const cargar = () => {
      getProveedoresContext() // obtiene los proveedores
      getSeccionesContext() // obtiene las secciones
    }
    cargar()
  }, [])
  const idFormAdmin = useId() // buena practica para generar id unicos
  const enviarFormulario = async (event)=> {
    event.preventDefault()
    const formulario = new FormData(event.target)
    const img = event.target[6].files[0]
    if (!img) {
      formulario.delete('imagen') // si no hay imagen, se elimina del formData, para que no se envie al servidor
    }
    const estado = formulario.get('estado') === 'true' // si es estado es true, se convierte a booleano
    formulario.set('estado', estado)
    const { success, message } = await actualizarProductoContext(id, formulario)
    if (success) {
      cerrarModal()
      toast.success(message)
    } else {
      cerrarModal()
      toast.error(message)
    }
  }
  const cambiarVistaImagen = (event) => {
    const imagen = event.target.files[0]
    if (imagen) { // si hay una imagen
      setVistaImagen(URL.createObjectURL(imagen)) // crear una url temporal de la imagen
    }
  }
  return (
    <form action="" onSubmit={enviarFormulario} id={`${idFormAdmin}-edicion`}>
      <div>
        <img style={{width: '100%', height: '200px'}} src={vistaImagen} alt="Imagen de Producto" className='rounded'/>
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" className="form-control" id="nombre" placeholder="Nombre del producto" name='nombre' defaultValue={nombre} required/>
      </div>
      <div className="form-group">
        <label htmlFor="seccion">Seccion</label>
        <select name="seccion" id="seccion" className='form-control' defaultValue={seccion.id}>
          {secciones.map(seccion => (
            <option key={seccion.id} value={seccion.id}> {/** esto mapea sobre los proveedores y envia el id del proveedor seleccionado para que en django lo busque */}
              {seccion.nombre}
            </option>
          )
          )}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tipo">Tipo</label>
        <select name="tipo" id="tipo" className='form-control'>
          <option value="bebidas">Bebidas</option>
          <option value="carnes">Carnes</option>
          <option value="lacteos">Lacteos</option>
          <option value="pastas">Pastas</option>
          <option value="snacks">Snacks</option>
          <option value="aseo">Aseo</option>
          <option value="otros">Otros</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="proveedor">Proveedor</label>
        <select name="proveedor" id="proveedor" className='form-control' defaultValue={proveedor.id}>
          {proveedores.map(proveedor => (
            <option key={proveedor.id} value={proveedor.id}> {/** esto mapea sobre los proveedores y envia el id del proveedor seleccionado para que en django lo busque */}
              {proveedor.nombre}
            </option>
          )
          )}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio</label>
        <input type="number" className="form-control" id="precio" name='precio' placeholder=" 93934374374" defaultValue={precio} required/>
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select className="form-control" id="estado"  name="estado" defaultValue={estado}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="imagen">Imagen (opcional)</label>
        <input type="file" className='form-control' onChange={cambiarVistaImagen} id='imagen' name='imagen'/>
      </div>
      <div className="d-flex justify-content-between pt-3">
        <button type='submit' className='btn btn-success'>Editar</button>
        <button type='button' className='btn btn-danger' onClick={cerrarModal}>Cancelar</button>
      </div>
    </form>
  )
}