import React from 'react'

export const VentasReducer = (stateVenta, action) => {
  const { type, payload } = action
  // para el switch se usa el type para saber que accion se ejecutara
  // y el payload para obtener los datos que se usaran en la accion
  // se usa el return para retornar el nuevo estado
  // se usa el ...state para no perder los datos que ya estan en el estado
  // se guarda el nuevo estado en una variable
  switch (type) {
    case 'CREATE_VENTA':
      return {
        ...stateVenta,
        ventas: [...stateVenta.ventas, payload]
      }
    case 'GET_VENTAS':
      return {
        ...stateVenta,
        ventas: payload
      }
  }
}
