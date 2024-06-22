import React, { useState } from 'react'

export const TablaStocks = ({ listaStocks, filtro }) => {

  if (filtro) {
    listaStocks = listaStocks.filter((stock) => {
      return stock.producto.nombre.toLowerCase().includes(filtro.toLowerCase()) || stock.producto.proveedor.nombre.toLowerCase().includes(filtro.toLowerCase()) || stock.descripcion.toLowerCase().includes(filtro.toLowerCase()) || stock.cantidad.toString().toLowerCase().includes(filtro.toLowerCase())
    })
  }
  if (listaStocks.length === 0) {
    return (
      <div className="alert alert-warning pt-3" role="alert">
        No hay productos con ese nombre
      </div>
    )
  }
 
  const [currentPage, setCurrentPage] = useState(1)
  // Se establece la cantidad de productos a mostrar por pagina
  const cantidadStocks = 10
  // Calculando el índice de inicio y fin de la lista actual en función de la página actual y los elementos por página
  const startIndex = (currentPage - 1) * cantidadStocks
  const endIndex = startIndex + cantidadStocks
  // Obtener los elementos a mostrar en la página actual, slice filtrara el inicio a fin
  const stocksMostrar = listaStocks.slice(startIndex, endIndex)
  // para calcular el numero total de paginas en funcion de la cantidad total de elementos y los elementos por pagina ej: el boton 1, 2, 3 etc..
  const totalBotones = Math.ceil(listaStocks.reverse().length / cantidadStocks)// reverse para que la tabla muestre desde el ultimo usuario creado al primero
  let contador = startIndex + 1 // para numerar los usuarios en la tabla comenzando por el starIndex aumentado en uno
  return (
    <section>
      
      <table className="table table-striped mb-0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th>Proveedor</th>
            <th>Descripcion</th>
            <th scope="col" className='text-center'>Stock Disponible</th>
          </tr>
        </thead>
        <tbody>
          {
            stocksMostrar.map((stock) => (
              <tr key={stock.id}>
                <th scope="row">{contador++}</th>
                <td>{stock.producto.nombre}</td>
                <td>{stock.producto.proveedor.nombre}</td>
                <td>{stock.descripcion}</td>
                <td className='text-center'>{stock.cantidad}</td>
     
              </tr>
            ))
          }
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
const SinStocks = () => {
  return (
    <section>
      <table className="table table-striped mb-0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th scope='col'>Proveedor</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">-</th>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      <h1 className='text-center pt-5'>No Hay Stocks Registrados</h1>
    </section>
  )
}


export const ValidarStocks = ({ listaStocks, filtro }) => {
  const validacion = listaStocks.length > 0 // si listaStocks es mayor a 0
  // sera true o false
  // RENDERIZADO CONDICIONAL
  return (
    validacion
      ? <TablaStocks listaStocks={listaStocks} filtro={filtro} />
      : <SinStocks />
  )
}
// Repositorio https://github.com/Gabriel117343
