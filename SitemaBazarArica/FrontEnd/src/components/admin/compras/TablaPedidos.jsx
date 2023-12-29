import { MagicMotion } from "react-magic-motion"
import { PedidosContext } from '../../../context/PedidosContext'
import { useState, useContext, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { PedidoDetalle } from './PedidoDetalle'
const MostrarPedidos = ({ listaPedidos, borrarPedido, filtro, recibirPedido }) => {
  const { statePedido: { pedidos }, getPedidosContext } = useContext(PedidosContext)
  const [showModal, setShowModal] = useState(false) // estado para mostrar la modal
  const [currentPage, setCurrentPage] = useState(1) // estado para la pagina actual
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null) // estado para el pedido seleccionado
  useEffect(() => {
    const cargar = () => {
      getPedidosContext()
    }
    cargar()
  }, [])
  const handleShow = () => setShowModal(true) // funcion para mostrar la modal
  const handleClose = () => setShowModal(false) // funcion para cerrar la modal
  const seleccionarPedido = (pedido) => {
    setPedidoSeleccionado(pedido) // aqui se guardara el pedido seleccionado para que pueda mostrarse en la modal
    
    handleShow()
  }
  console.log(listaPedidos)
  if (filtro) {
    listaPedidos = listaPedidos.filter(pedido => pedido.proveedor.nombre.toLowerCase().includes(filtro.toLowerCase()))

  }
  if (listaPedidos.length === 0) {
    return (
      <div className="alert alert-warning mt-3" role="alert">
        No se han encontrado pedidos con ese nombre
      </div>
    )
  }
  
  const imprimir = () => {
    print()
  }
 
  // Se define la cantidad de usuarios a mostrar por pagina
  const cantidadPedidos = 10
  // Calculando el índice de inicio y fin de la lista actual en función de la página actual y los elementos por página
  const startIndex = (currentPage - 1) * cantidadPedidos
  const endIndex = startIndex + cantidadPedidos
  // Obtener los elementos a mostrar en la página actual, slice filtrara el inicio a fin
  const pedidosMostrar = listaPedidos.slice(startIndex, endIndex)
  // para calcular el numero total de paginas en funcion de la cantidad total de elementos y los elementos por pagina ej: el boton 1, 2, 3 etc..
  const totalBotones = Math.ceil(listaPedidos.reverse().length / cantidadPedidos)// reverse para que la tabla muestre desde el ultimo usuario creado al primero
  let contador = startIndex + 1 // para numerar los usuarios en la tabla comenzando por el starIndex aumentado en uno
  console.log(pedidosMostrar)
  return (
    <section>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha Creacion</th>
            <th>Codigo</th>
            <th>Proveedor</th>
            <th>Productos</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <MagicMotion>
            {pedidosMostrar?.map((pedido) => {
                return (
                  <tr key={pedido.id}>
                    <td>{contador++}</td>
                    <td>{pedido?.fecha_pedido.slice(0,10)}</td>
                    <td>{pedido?.codigo}</td>
                    <td>{pedido?.proveedor.nombre}</td>
                    <td>{pedido?.productos.length}</td>
                    <td>{pedido?.estado === 'pendiente' ?<p style={{borderRadius: '30px', maxWidth: '80px', maxHeight: '24px'}} className="p-1 m-0 text-white bg-primary d-flex align-items-center justify-content-center mt-1">Pendiente</p> : <p style={{borderRadius: '30px', maxWidth: '80px', maxHeight: '24px'}} className="p-1 m-0 text-white bg-success d-flex align-items-center mt-1 justify-content-center">Recibidio</p>}</td>
                    <td className="d-flex gap-1">
                      <button className="btn btn-dark" onClick={() => recibirPedido(pedido)}><i className="bi bi-boxes" ></i> Recibir</button>
                      <button className="btn btn-danger" onClick={() => borrarPedido(pedido.id)}><i className="bi bi-trash"></i></button>
                      <button className="btn btn-primary" onClick={() => seleccionarPedido(pedido)}>Ver</button>
                    </td>
                    
                  </tr>
                )
              })
            }
          </MagicMotion>
          
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle del pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pedidoSeleccionado && <PedidoDetalle pedido={pedidoSeleccionado} />}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={imprimir}>Imprimir</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* bucle Array.from() para generar botones según la cantidad de páginas necesarias, solo se usara el indice del array */}
      {Array.from({ length: totalBotones }, (_, index) => (
          <button key={index + 1} className={`btn ${currentPage === index + 1 ? 'btn-info' : 'btn-secondary'}`} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
    </section>
  )
}
const SinPedidos = () => {
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
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
          </tr>
        </tbody>
      </table>
      <h1 className="text-center">No hay Ordenes Registradas</h1>
    </section>
  )
}
export const ValidarPedidos = ({ listaPedidos, borrarPedido, filtro, recibirPedido }) => {
  const validacion = listaPedidos.length > 0
  // RENDERIZADO CONDICIONAL, la validacion es true o false

  return validacion ?
    <MostrarPedidos listaPedidos={listaPedidos} borrarPedido={borrarPedido} filtro={filtro} recibirPedido={recibirPedido} />
    :
    <SinPedidos />
}
