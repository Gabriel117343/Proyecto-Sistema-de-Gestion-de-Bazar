import { useState } from 'react'
import { MagicMotion } from 'react-magic-motion'
import './styles.css'
const MostrarProductos = ({ listaProductos, borrarProducto, edicionProducto, filtro }) => {
  // Definir el estado para manejar la página actual, por defecto se mostrara la pagina 1 de la tabla
  if (filtro) {

    listaProductos = listaProductos.filter(producto => {
      return producto.nombre.toLowerCase().includes(filtro.toLowerCase()) || producto.codigo.toLowerCase().includes(filtro.toLowerCase()) || producto.precio.toLowerCase().includes(filtro.toLowerCase() || producto.tipo.toLowerCase().includes(filtro.toLowerCase())) || producto.estado.toString().toLowerCase().includes(filtro.toLowerCase()) || producto.tipo.toLowerCase().includes(filtro.toLowerCase()) || producto.seccion.nombre.toLowerCase().includes(filtro.toLowerCase()) || producto.proveedor.nombre.toLowerCase().includes(filtro.toLowerCase())
    })
  }
  if (listaProductos.length === 0) {
    return (
      <div className="alert alert-warning mt-3" role="alert">
        No se han encontrado productos con ese nombre
      </div>
    )
  }
  const [currentPage, setCurrentPage] = useState(1)
  // Se define la cantidad de usuarios a mostrar por pagina
  const cantidadProductos = 10
  // Calculando el índice de inicio y fin de la lista actual en función de la página actual y los elementos por página
  const startIndex = (currentPage - 1) * cantidadProductos
  const endIndex = startIndex + cantidadProductos
  // Obtener los elementos a mostrar en la página actual, slice filtrara el inicio a fin
  const productosMostrar = listaProductos.slice(startIndex, endIndex)
  // para calcular el numero total de paginas en funcion de la cantidad total de elementos y los elementos por pagina ej: el boton 1, 2, 3 etc..
  const totalBotones = Math.ceil(listaProductos.reverse().length / cantidadProductos)// reverse para que la tabla muestre desde el ultimo usuario creado al primero
  let contador = startIndex + 1 // para numerar los usuarios en la tabla comenzando por el starIndex aumentado en uno

  return (
    <section>
      <table className="table table-striped mb-0" id='tabla-productos'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Secction</th>
            <th>Codigo</th>
            <th>tipo</th>
            <th>Precio</th>
            <th>Proveedor</th>
            <th>Estado</th>
            <th colSpan={2} className='text-center'>Opciones</th>
          </tr>
        </thead>
        <tbody>{/* Cuando hay un cambio anima la tabla */}
          <MagicMotion> 
            {productosMostrar.map(producto => (
              <tr key={producto.id}>
                <td>{contador++}</td>
                <td className='text-capitalize'>{producto.nombre}</td>
                <td>{producto.seccion.nombre}</td>
                <td>{producto.codigo}</td>
                <td className='text-capitalize'>{producto.tipo}</td>
                <td>$ {producto.precio}</td>
                <td>{producto.proveedor.nombre}</td>
                <td>{producto.estado ? <div style={{borderRadius: '35px'}} className='border d-flex justify-content-center bg-success text-white'><p className='m-0'>Activo</p></div>
                : <div style={{borderRadius: '35px'}} className='border d-flex d-flex justify-content-center bg-danger text-white'><p className='m-0'>Inactivo</p></div>}</td>
                <td className='text-center'><button className='btn btn-info' onClick={() => edicionProducto(producto.id)}><i className='bi bi-pencil-square'></i></button></td>
                <td className='text-center'><button className='btn btn-danger' onClick={() => borrarProducto(producto.id)}><i className='bi bi-trash'></i></button></td>


              </tr>
            ))}
          </MagicMotion>
        </tbody> 
      </table>
      {/* bucle Array.from() para generar botones según la cantidad de páginas necesarias, solo se usara el indice del array */}
      {Array.from({ length: totalBotones }, (_, index) => (
          <button key={index + 1} className={`btn ${currentPage === index + 1 ? 'btn-info' : 'btn-secondary'}`} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
    </section>
  )
}
const SinProductos = () => {
  
    return (
      <section>
        <table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Secction</th>
              <th>Codigo</th>
              <th>tipo</th>
              <th>Precio</th>
              <th>Proveedor</th>
              <th>Estado</th>
              <th colSpan={2} className='text-center'>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>

        </table>
        <h1 className="text-center pt-4">No Hay Productos Registrados</h1>
      </section>
    )
}
export const ValidarProductos = ({ listaProductos, borrarProducto, edicionProducto, filtro}) => {

  const validacion = listaProductos.length > 0 // si listaProductos es mayor a 0
  // sera true o false
  // RENDERIZADO CONDICIONAL
  console.log(listaProductos)
  return (
    validacion
    ? <MostrarProductos listaProductos={listaProductos} borrarProducto={borrarProducto} edicionProducto={edicionProducto} filtro={filtro}/>
    : <SinProductos />
  )
}