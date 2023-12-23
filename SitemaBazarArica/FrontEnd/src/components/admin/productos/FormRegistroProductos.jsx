import React, { useId, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import debounce  from 'lodash/debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // icono eye para usar en input contraseña
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ProductosContext } from '../../../context/ProductosContext'
import { ProveedoresContext } from '../../../context/ProveedoresContext'
import { SeccionesContext } from '../../../context/SeccionesContext'

export const FormRegistroProductos = ({ cerrarModal }) => {
  // cambiar el boton en true o false con isBtnDisabled

  const { crearProductoContext } = useContext(ProductosContext)
  const { stateProveedor: { proveedores }, getProveedoresContext } = useContext(ProveedoresContext)
  const { stateSeccion: { secciones }, getSeccionesContext } = useContext(SeccionesContext)
  const imagenInicial = '../../../public/images/seccion-productos.jpg'
  const [ vistaImagen, setVistaImagen ] = useState(imagenInicial)
  useEffect(() => {
    const cargar = () => {
      getProveedoresContext()
      getSeccionesContext()
    }
    cargar()
  }, [])

  const idFormAdmin = useId()

  const enviarFormulario = async (event) => {
    event.preventDefault()
    toast.loading('Registrando producto...', { id: 'loading' })

    const formulario = new FormData(event.target)
    // convertir el estado a booleano
    const estado = formulario.get('estado') === 'true'
    formulario.set('estado', estado)

    const { success, message } = await crearProductoContext(formulario)  // se envia el formulario al contexto
    if (success) {
      toast.dismiss('loading', { id: 'loading' })
      toast.success(message)
      event.target.reset()
      cerrarModal()
    } else {
      toast.dismiss('loading')
      toast.error(message)
      cerrarModal()
    }
  }
  const cambiarVistaImagen = (event) => {
    const imagen = event.target.files[0]
    if (imagen) { // si hay una imagen
      setVistaImagen(URL.createObjectURL(imagen)) // crear una url temporal de la imagen
    }
  }
  return (
    <form onSubmit={enviarFormulario} id={`${idFormAdmin}-producto`}>
      <img style={{width: '100%', height: '200px'}} src={vistaImagen} alt="Imagen de Producto" className='rounded'/>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" className="form-control" id="nombre" placeholder="Nombre del producto" name='nombre' required/>
      </div>
      <div className="form-group">
        <label htmlFor="seccion">Seccion</label>
        <select name="seccion" id="seccion" className='form-control'>
          {secciones.map(seccion => (
            <option key={seccion.id} value={seccion.id}> {/** esto mapea sobre los proveedores y envia el id del proveedor seleccionado para que en django lo busque */}
              {seccion.nombre}
            </option>
          ))
          }
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="codigo">Codigo</label>
        <input type="text" className="form-control" id="codigo" name='codigo' placeholder="Codigo" required/>
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
        <label htmlFor="precio">Precio</label>
        <input type="text" className="form-control" id="precio" name='precio' placeholder="Precio" required/>
      </div>
      <div className="form-group">
        <label htmlFor="proveedor">Proveedor</label>
        <select name="proveedor" id="proveedor" className='form-control'>
          {proveedores.map(proveedor => (
            <option key={proveedor.id} value={proveedor.id}> {/** esto mapea sobre los proveedores y envia el id del proveedor seleccionado para que en django lo busque */}
              {proveedor.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select className="form-control" id="estado"  name="estado" defaultValue='true'>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="imagen">Imagen (opcional)</label>
        <input className='form-control' type="file" name='imagen' onChange={cambiarVistaImagen}/>
      </div>
      <div className="d-flex justify-content-between pt-3">
        <button type="submit" className="btn btn-primary" >Registrar</button>
        <button type="button" className="btn btn-danger" onClick={cerrarModal}>Cancelar</button>
      </div>
    </form>
  )
}
