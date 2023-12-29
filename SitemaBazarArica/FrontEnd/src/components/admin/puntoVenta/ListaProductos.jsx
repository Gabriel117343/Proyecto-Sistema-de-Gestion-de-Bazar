
import './puntoventa.css'
import React, { useContext, useEffect, useState } from 'react'
import { StocksContext } from '../../../context/StocksContext'
import { VentasContext } from '../../../context/VentasContext' // contexto de ventas
import { ClientesContext } from '../../../context/ClientesContext'
import { MagicMotion } from 'react-magic-motion'
import { Modal, Button } from 'react-bootstrap'
import { FormRegistroCliente } from './FormRegistroCliente'
import { ListaClientes } from './ListaClientes'
import { toast } from 'react-hot-toast'
import { get, set } from 'lodash'
import swal from 'sweetalert2'
const ListaProductos = ({ listaProductos }) => {
  // Para la modal de edicion
  const [showModal, setShowModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false)
  // Contextos
  const { stateVenta: { ventas }, getVentasContext, createVentaContext } = useContext(VentasContext)
  const { stateCliente: { clientes, clienteSeleccionado }, getClientesContext } = useContext(ClientesContext)
  const { stateStock: { stocks }, getStocksContext } = useContext(StocksContext)
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos)
  const [carrito, setCarrito] = useState([])
  const agregarProducto = (producto) => {
    const productoEnCarrito = carrito.find(prod => prod.id === producto.id)
    if (productoEnCarrito) {
      const productosActualizados = carrito.map(prod => {
        if (prod.id === producto.id) {
          prod.cantidad += 1
          return prod
        } else {
          return prod
        }
      })
      toast.success('Producto agregado')
      setCarrito(productosActualizados)
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }
  useEffect(() => {
    const cargar = async () => {
      getStocksContext()
      getClientesContext()
      getVentasContext()
      
    }
    cargar()
  }, [])
  console.log(ventas)
  // useEffect para guardar los productos
  useEffect (() => {
    setProductosFiltrados(listaProductos)
  
  }, [])
  const filtroTipo = (event) => {
    const tipo = event.target.value
    if (tipo === 'all') {
      setProductosFiltrados(listaProductos)
      return
    }
    const productosFilt = listaProductos.filter(producto => producto.tipo === tipo)
    setProductosFiltrados(productosFilt)
  }
  const filtroNombre = (event) => {
    const nombre = event.target.value
    
    const productosFilt = listaProductos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()))
    console.log(productosFilt)
    setProductosFiltrados(productosFilt)
  }
  const realizarVenta = async () => {
    console.log(carrito)
    console.log(clienteSeleccionado)
    const formVenta = new FormData()
    formVenta.append('cliente', clienteSeleccionado.id)
    formVenta.append('total', carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)) // total de la venta

    
    // agregar productos

    const { success, message } = await createVentaContext(formVenta)

    if (success) {
      setCarrito([]) // se vacia el carrito
      swal.fire({
        title: 'Venta realizada',
        text: message,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      })
    } else {
      swal.fire({
        title: 'Error al realizar la venta',
        text: message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      
      })
    }
  }
  return (
    <div className="row">
      <div className="col-md-4 pt-4">
        <div className="carrito">
   
          <ul className='ul-carrito'>
            {carrito?.map(producto => (
              <li key={producto.id}>
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{producto.nombre}</strong>
                    <p className='ps-4'><strong>{producto.cantidad}</strong>/Unidades en ${producto.cantidad*producto.precio}</p>
                  </div>
                  <div>
                    <strong>${producto.precio}</strong>
                  </div>
                </div>
              </li>
            ))}
            {carrito?.length === 0 && <div className='text-center' style={{fontSize: '150px'}}><i class="bi bi-cart-x"></i></div>}
          </ul>
          <div className="d-flex justify-content-between gap-2 px-1">
            <button className='btn btn-info form-control'>Cupon</button>
            <button className='btn btn-danger form-control' onClick={() =>setCarrito([])}>Cancelar</button>
          </div>
          {clienteSeleccionado ? (
            <div className='d-flex align-items-center gap-2 pt-1 px-1'>
              <i class="bi bi-person-circle" style={{fontSize: '40px'}}></i>
              <p className='text-center m-0'>{clienteSeleccionado.nombre} {clienteSeleccionado.apellido}</p>
            </div>
          )
          :
          (
            <div className='d-flex align-items-center gap-3 pt-1 px-1'>
              <i class="bi bi-person-circle" style={{fontSize: '40px'}}></i>
              <button className='btn border ' onClick={() => setShowModal(true)}>Agregar Cliente</button>
              <button className='btn border' onClick={() => setShowListModal(true)}>Seleccionar Cliente</button>
            </div>

          )
        }
          
          <div className="d-flex justify-content-between gap-2 pt-2 px-2">
            <strong>Total</strong>
            <strong>$ {carrito?.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)}</strong>
          </div>
          <button disabled={clienteSeleccionado ? false:true} className='btn btn-success form-control mt-2' onClick={realizarVenta}>Pagar</button>
        </div>
      </div>
      <div className="col-md-8">
        <div className="row pb-2">
          <div className="col-md-6">
            <label htmlFor="">Filtrar por tipo</label>
            <select className='form-control' name="tipo" id="" onChange={filtroTipo}>
                <option value="all">Todas</option>
                <option value="bebidas">Bebidas</option>
                <option value="carnes">Carnes</option>
                <option value="lacteos">Lacteos</option>
                <option value="pastas">Pastas</option>
                <option value="snacks">Snacks</option>
                <option value="aseo">Aseo</option>
                <option value="otros">Otros</option>
              </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="">Buscar</label>
            <input type="text" className="form-control" placeholder="Ej: Arroz Miraflores" onChange={filtroNombre}/>
            
          </div>
        </div>
        <ul className='productos'>
          <MagicMotion className='row' name='productos' duration={0.5}>
            {productosFiltrados?.map(producto => (
              <li key={producto.id} className='producto'>
                <div className="producto">
                  <div >
                    
                    {producto.imagen ? <img width='100%' height='200px' src={producto.imagen} alt="" />: <img width='100%' height='200px' src='https://ww.idelcosa.com/img/default.jpg' alt="" />}
                  </div>
                  <div className="p-0 m-0">
                    <p className="producto__nombre p-0 m-0">{producto.nombre}</p>
                    <p className="producto__precio m-0">{producto.precio}</p>
                  </div>
                  <div className='pt-0 mt-0'>
                    <button className="btn btn-warning form-control" onClick={() => agregarProducto(producto)}>Agregar</button>
                  </div>
                </div>
                
              </li>
              
            ))}
          </MagicMotion>
          {productosFiltrados.length === 0 && <h1 className='text-center pt-4'>No se han econtrado Productos..</h1>}
          

        </ul>
        
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistroCliente cerrarModal={() => setShowModal(false)}/>
        </Modal.Body>
      </Modal>
      
      <Modal show={showListModal} onHide={() => setShowListModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Seleccionar Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListaClientes clientes={clientes} cerrarModal={() => setShowListModal(false)}/>
          </Modal.Body>
      </Modal>
    </div>
  )
}
const SinProductos = () => {
  return (
    <div className="alert alert-danger" role="alert">
      No hay productos en la lista
    </div>
  )

}

export const ValidarProductos = ({ listaProductos }) => {

  const validacion = listaProductos.length > 0
  // RENDERIZADO CONDICIONAL, la validacion es true o false
  return (
    <>
      {validacion ?
        <ListaProductos listaProductos={listaProductos} />
        :
        <SinProductos />
      }
    </>
  )
}