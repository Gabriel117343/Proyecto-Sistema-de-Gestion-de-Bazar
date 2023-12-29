import React from 'react'

export const PedidoDetalle = ({ pedido }) => {
  console.log(pedido)

  return (
    <div>
      <h2>Detalle del Pedido {pedido.codigo}</h2>
      <p>Proveedor: {pedido.proveedor.nombre}</p>
      <p>Contacto: {pedido.proveedor.persona_contacto}</p>
      <p>Teléfono: {pedido.proveedor.telefono}</p>
    
      <p>Fecha del Pedido: {pedido.fecha_pedido.slice(0,10)}</p>
      <p>Estado: {pedido.estado}</p>
      <p>Total: {pedido.total}</p>
      <p>Observación: {pedido.observacion}</p>

      <h3>Productos:</h3>
      {pedido.productos.map((producto, index) => (
        <div key={index}>
          <p className='colorLabel'>Producto ID: {producto.producto}</p>
          <p>Cantidad: {producto.cantidad}</p>
          <p>Precio: {producto.precio}</p>
        </div>
      ))}
    </div>
  )
}
