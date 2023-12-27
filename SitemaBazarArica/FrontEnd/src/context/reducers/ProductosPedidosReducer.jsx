import React from 'react'

export const ProductosPedidosReducer = (productosPedidosState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'CRATE_PEDIDO':
      return {
        ...productosPedidosState,
        listaPedidos: [...productosPedidosState.listaPedidos, payload]
      }
    case 'DELETE_PEDIDO':
      return {
        ...productosPedidosState,
        listaPedidos: productosPedidosState.listaPedidos.filter(pedido => pedido.id !== payload)
      }
    case 'UPDATE_PEDIDO':
      return {
        ...productosPedidosState,
        listaPedidos: productosPedidosState.listaPedidos.map(pedido => pedido.id === payload.id ? payload : pedido)
      }
    case 'GET_PEDIDOS':
      return {
        ...productosPedidosState,
        listaPedidos: payload
      }
    case 'GET_PEDIDO':
      return {
        ...productosPedidosState,
        pedidoSeleccionado: payload
      }
    default:
      return productosPedidosState
  }
}
