import React, { useState } from 'react'
import { MagicMotion } from 'react-magic-motion'

const MostrarSecciones = ({listaSecciones, borrarSeccion, edicionSeccion, filtro}) => {

  if (filtro) { // si hay un filtro se filtra la lista de secciones sino se muestra la lista completa
    listaSecciones = listaSecciones.filter(seccion => seccion.nombre.toLowerCase().includes(filtro.toLowerCase()) || seccion.numero.toString().toLowerCase().includes(filtro.toLowerCase()) || seccion.descripcion.toLowerCase().includes(filtro.toLowerCase()))
  } // Busca la seccion por su nombre
  if (listaSecciones.length === 0) {
    return (
      <div className="alert alert-warning mt-3" role="alert">
        No se han encontrado secciones con ese nombre
      </div>
    )
  }
  const [currentPage, setCurrentPage] = useState(1) // estado para manejar la pagina actual, por defecto se mostrara la pagina 1 de la tabla
  // Se define la cantidad de secciones a mostrar por pagina
  const cantidadSecciones = 10
  // Calculando el índice de inicio y fin de la lista actual en función de la página actual y los elementos por página
  const startIndex = (currentPage - 1) * cantidadSecciones
  const endIndex = startIndex + cantidadSecciones
  // Obtener los elementos a mostrar en la página actual, slice filtrara el inicio a fin
  const seccionesMostrar = listaSecciones.slice(startIndex, endIndex)
  // Servira para calcular el número total de paginas en función de la cantidad total de elementos y los elementos por página ej: el boton 1, 2, 3 etc..
  const totalBotones = Math.ceil(listaSecciones.reverse().length / cantidadSecciones)// reverse para que la tabla muestre desde el ultimo usuario creado al primero
  let contador = startIndex + 1 // para numerar los usuarios en la tabla comenzando por el starIndex aumentado en uno
  return (
      <section>
        <table className="table table-striped table-hover table-bordered mt-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Numero</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <MagicMotion> {/* Cuando hay un cambio anima la tabla */}
            {seccionesMostrar.map(seccion => (
                <tr key={seccion.id}>
                  <th scope="row">{contador++}</th>
                  <td>{seccion.nombre}</td>
                  <td>{seccion.numero}</td>
                  <td>{seccion.descripcion}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button onClick={() => edicionSeccion(seccion.id)} className='btn btn-outline-primary'><i className="bi bi-pencil-fill"></i></button>
                      <button onClick={() => borrarSeccion(seccion.id)} className='btn btn-outline-danger'><i className="bi bi-trash-fill"></i></button>
                    </div>
                  </td>
                </tr>
                ))
              }

          </MagicMotion>
          
        </tbody>
      </table>
      <div className="pagination-buttons mb-3 mt-1 animacion-numeros">
        {Array.from({ length: totalBotones }, (_, index) => (
          <button key={index + 1} className={`btn ${currentPage === index + 1 ? 'btn-info' : 'btn-secondary'}`} onClick={() => setCurrentPage(index + 1)}>
          {index + 1}
          </button>
        ))}
      </div>
    </section>
      
  )
}
const SinSecciones = () => {
  return (
    <section>
      <table className='table table-striped table-hover table-bordered mt-2'>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope='col'>Numero</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>

        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      <h1 className='text-center pt-5'>No Hay Secciones Registradas</h1>
    </section>
  )
}
export const ValidarSecciones = ({listaSecciones, borrarSeccion, edicionSeccion, filtro}) => {

  const validacion = listaSecciones?.length > 0 // valida si hay secciones , el resultado sera true o false
  return (
    validacion ?
    <MostrarSecciones listaSecciones={listaSecciones} borrarSeccion={borrarSeccion} edicionSeccion={edicionSeccion} filtro={filtro}/>
    :
    <SinSecciones />
  )
}
