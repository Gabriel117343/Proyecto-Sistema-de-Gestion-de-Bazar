import React from 'react'

export const ClientesReducer = (stateCliente, action) => {
  const { type, payload } = action
  switch (type) {
    case 'GET_CLIENTES':
      return {
        ...stateCliente,
        clientes: payload
      }
    case 'CREATE_CLIENTE':
      return {
        ...stateCliente,
        clientes: [...stateCliente.clientes, payload]
      }
    case 'GET_CLIENTE':
      return {
        ...stateCliente,
        clienteSeleccionado: payload
      }
    default:
      return stateCliente
  }
}
