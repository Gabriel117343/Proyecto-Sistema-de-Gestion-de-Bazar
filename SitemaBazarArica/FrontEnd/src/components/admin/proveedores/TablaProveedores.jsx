import React, { useState } from 'react'
import { MagicMotion } from 'react-magic-motion'
import './styles.css'

const MostrarTabla = ({ listaProveedores, borrarProovedor, edicionProveedor, filtro }) => {
  // Definir el estado para manejar la página actual, por defecto se mostrara la pagina 1 de la tabla

  if (filtro) { // si el input de busqueda tiene algo se filtrara la lista de usuarios
    listaProveedores = listaProveedores.filter(proveedor => {
      return proveedor.nombre.toLowerCase().includes(filtro.toLowerCase()) || proveedor.persona_contacto.toLowerCase().includes(filtro.toLowerCase()) || proveedor.telefono.toLowerCase().includes(filtro.toLowerCase()) || proveedor.direccion.toLowerCase().includes(filtro.toLowerCase())
    })
  }
  if (listaProveedores.length === 0) {
    return (
      <div className="alert alert-warning mt-3" role="alert">
        No se han encontrado proveedores con ese nombre
      </div>
    )
  }
  const [currentPage, setCurrentPage] = useState(1)
  // Se define la cantidad de usuarios a mostrar por pagina
  const cantidadProveedores = 10
  // Calculando el índice de inicio y fin de la lista actual en función de la página actual y los elementos por página
  const startIndex = (currentPage - 1) * cantidadProveedores
  const endIndex = startIndex + cantidadProveedores
  // Obtener los elementos a mostrar en la página actual, slice filtrara el inicio a fin
  const proveedoresMostrar = listaProveedores.slice(startIndex, endIndex)
  // Servira para calcular el número total de páginas en función de la cantidad total de elementos y los elementos por página ej: el boton 1, 2, 3 etc..
  const totalBotones = Math.ceil(listaProveedores.reverse().length / cantidadProveedores)// reverse para que la tabla muestre desde el ultimo usuario creado al primero
  let contador = startIndex + 1 // para numerar los usuarios en la tabla comenzando por el starIndex aumentado en uno
  return (
    <section >
      <table className='table table-striped mb-0' id='tabla-proveedores'>
        <thead className="border-bottom">
          <tr>
            <th>#</th>
            <th>Fecha Creacion</th>
            <th>Nombre</th>
            <th>Persona Contacto</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Estado</th>
            <th colSpan={2} className='text-center'>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <MagicMotion> {/* animacion de la tabla */}
            {proveedoresMostrar.map(proveedor =>  (
              <tr key={proveedor.id}>
                <td>{contador++}</td>
                <td>{proveedor.fecha_creacion.substring(0, 10)}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.persona_contacto}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.estado ? <div style={{borderRadius: '35px'}} className='border d-flex justify-content-center bg-success text-white'><p className='m-0'>Activo</p></div>
                : <div style={{borderRadius: '35px'}} className='border d-flex d-flex justify-content-center bg-danger text-white'><p className='m-0'>Inactivo</p></div>}</td>
                <td className='text-center'><button className='btn btn-info' onClick={() => edicionProveedor(proveedor.id)}><i className='bi bi-pencil-square'></i></button></td>
                <td className='text-center'><button className='btn btn-danger' onClick={() => borrarProovedor(proveedor.id)}><i className='bi bi-trash'></i></button></td>
              </tr>
            ))}
          </MagicMotion>
        </tbody>
      </table>
      <div className='pagination-buttons mb-3 mt-1 animacion-numeros'>
        {/* bucle Array.from() para generar botones según la cantidad de páginas necesarias, solo se usara el indice del array */}
        {Array.from({ length: totalBotones }, (_, index) => (
          <button key={index + 1} className={`btn ${currentPage === index + 1 ? 'btn-info' : 'btn-secondary'}`} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

    </section>
  )
}

const SinProveedores = () => {
  
    return (
      <section className='pb-5'>
      <table className='table table-striped'>
        {/* Esto solo se motrara si listaPersonas esta vacia es decir si no  hay usuarios registrados, util para evitar errores cuando la base de datos no responde */}
        <thead className='border-bottom '>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Persona Contacto</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Estado</th>
            <th>Opciones</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
          </tr>
        </tbody>
      </table>
      <h1 className='text-center pt-5'>No Hay Proveedores Registrados</h1>
    </section>
    )
}
export const ValidarProveedores = ({ listaProveedores, borrarProovedor, edicionProveedor, filtro }) => {
  console.log(listaProveedores)
  const validacion = listaProveedores.length > 0 // si listaProveedores es mayor a 0
  // si persona es igual a true o false
  // RENDERIZADO CONDICIONAL 
  return (
    validacion
      ? <MostrarTabla listaProveedores={listaProveedores} borrarProovedor={borrarProovedor} edicionProveedor={edicionProveedor} filtro={filtro} />
      : <SinProveedores />
  )
}