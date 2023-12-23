import React from 'react'

export const StocksReducer = (stateStock, action) => {
  const { type, payload } = action // destructuring de la accion

  switch (type) {

    case 'GET_STOCKS':
      return {
        ...stateStock,
        stocks: payload // guarda los stocks en el estado
      }
    case 'GET_STOCK':
      return {
        ...stateStock,
        stockSeleccionado: payload // guarda el stock seleccionado en el estado
      }
    case 'UPDATE_STOCK':
      return {
        ...stateStock, // copia el estado actual del componente
        stocks: stateStock.stocks.map((stock) => stock.id === payload.id ? payload : stock) // actualiza el stock  que se modifico y deja los demas igual como estaban antes de la modificacion
      }
    default:
      return stateStock // retorna el estado actual del componente si no se ejecuta ninguna accion
  }
}
