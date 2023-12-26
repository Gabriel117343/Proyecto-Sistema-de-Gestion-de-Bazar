

export const PedidosReducer = (statePedido, action) => {

  const { type, payload } = action

  switch (type) {

    case 'GET_PEDIDOS':
      return {
        ...statePedido,
        pedidos: payload
      }
    case 'GET_PEDIDO':
      return {
        ...statePedido,
        pedidoSeleccionado: payload
      }
    case 'CREATE_PEDIDO':
      return {
        ...statePedido, // crear un nuevo estado a partir del estado actual
        pedidos: [...statePedido.pedidos, payload]
      }
    case 'DELETE_PEDIDO':
      return {
        ...statePedido, // filtramos los pedidos que no sean iguales al id que se esta pasando
        pedidos: statePedido.pedidos.filter(pedido => pedido.id !== payload)
      }
    case 'UPDATE_PEDIDO':
      return {
        ...statePedido,
        pedidos: statePedido.pedidos.map(pedido => pedido.id === payload.id ? payload : pedido)
      }
    default:
      return statePedido // retorna el estado del contexto
  }
}
