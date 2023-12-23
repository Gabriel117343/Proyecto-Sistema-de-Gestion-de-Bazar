import React, { createContext, useReducer, useContext } from 'react'
import { getAllStocks, updateStock, getStock } from '../api/stocks.api'
import { LoginContext } from './LoginContext'
import { StocksReducer } from './reducers/StocksReducer'
export const StocksContext = createContext() // crea el contexto

export const StocksProvider = ({ children }) => {
  
  const { stateLogin: { token } } = useContext(LoginContext) // destructuring del token del estado global
  const initialState = {
    stocks: [],
    stockSeleccionado: null
  } // estado inicial de los stocks para el Reducer de los stocks
  const [stateStock, dispatch] = useReducer(StocksReducer, initialState) // creando el reducer de los stocks
  // ASI TENGO TODO EL CODIGO DE LOS USUARIOS EN UN SOLO LUGAR Y NO TENGO QUE IMPORTAR LAS FUNCIONES EN CADA COMPONENTE QUE LAS NECESITE
  // UNICAMENTE SE PASAN LOS PARAMETROS QUE NECESITAN LAS FUNCIONES
  
  const getStocksContext = async () => {
    try {
      const res = await getAllStocks(token) // res para referenciarse al response del servidor
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'GET_STOCKS',
          payload: res.data.data
        })
        return ({ success: true, message: res.data.message })
        // return ({ success: true, message: 'Usuario obtenido' }) > Asi se puede retornar un mensaje de exito sin necesidad de obtenerlo del response del servidor
      }
    } catch (error) { // si hay un error en la peticion se ejecuta este bloque que captura el response del servidor
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  const getStockContext = async (id) => {
    try {
      const res = await getStock(id, token) // res para referenciarse al response del servidor
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'GET_STOCK',
          payload: res.data.data
        })
        return ({ success: true, message: res.data.message })
      }
    } catch (error ) {
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  const updateStockContext = async (id, data) => {
    try {
      const res = await updateStock(id, data, token) // res para referenciarse al response del servidor
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'UPDATE_STOCK',
          payload: res.data.data
        })
        return ({ success: true, message: res.data.message })
      }
    } catch (error ) {
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  return (
    <StocksContext.Provider value={{
      getStocksContext,
      getStockContext,
      updateStockContext,
      stateStock
    }}>{ children }
    </StocksContext.Provider>
  )
}
