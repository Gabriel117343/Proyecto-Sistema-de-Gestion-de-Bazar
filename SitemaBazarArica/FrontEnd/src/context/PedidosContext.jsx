import { createContext, useContext, useReducer } from 'react'
import { getAllPedidos, getPedido, createPedido, deletePedido, updatePedido, recibirPedido } from '../api/pedidos.api'
import { LoginContext } from '../context/LoginContext'
import { PedidosReducer } from './reducers/PedidosReducer'

export const PedidosContext = createContext()

export const PedidosProvider = ({ children }) => {

  const { stateLogin: { token } } = useContext(LoginContext)
  const initialState = {
    pedidos: [],
    pedidoSeleccionado: null
  }
  const [statePedido, dispatch] = useReducer(PedidosReducer, initialState)
  // ASI TENGO TODO EL CODIGO DE LOS USUARIOS EN UN SOLO LUGAR Y NO TENGO QUE IMPORTAR LAS FUNCIONES EN CADA COMPONENTE QUE LAS NECESITE
  // UNICAMENTE SE PASAN LOS PARAMETROS QUE NECESITAN LAS FUNCIONES

  const getPedidosContext = async () => {
      
      try {
        const res = await getAllPedidos(token)
        console.log(res)
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: 'GET_PEDIDOS',
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
  const getPedidoContext = async (id) => {
    try {
      const res = await getPedido(id, token)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'GET_PEDIDO',
          payload: res.data
        }) // si la peticion es exitosa se ejecuta el dispatch para actualizar el estado global de los productos
        return ({ success: true, message: res.data.message })
        // return ({ success: true, message: 'Usuario obtenido' }) > Asi se puede retornar un mensaje de exito sin necesidad de obtenerlo del response del servidor
      }
    } catch (error) { // si hay un error en la peticion se ejecuta este bloque que captura el response del servidor 
      return ({ success: false, message: error.response.data.error })
    }
  }
  const crearPedidoContext = async (pedido) => {
    const p = Object.fromEntries(pedido)
    console.log(p)
    try {
      const res = await createPedido(pedido, token)
  
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'CREATE_PEDIDO',
          payload: res.data.data
        })
        return ({ success: true, message: res.data.message, pedidoId: res.data.pedidoId })
      }
    } catch (error) {
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  const eliminarPedidoContext = async (id) => {
    try {
      const res = await deletePedido(id, token)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'DELETE_PEDIDO',
          payload: id
        })
        return ({ success: true, message: res.data.message })
      }
    } catch (error) {
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  const actualizarPedidoContext = async (id, pedido) => {
    try {
      const res = await updatePedido(id, pedido, token)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'UPDATE_PEDIDO',
          payload: res.data.data
        })
        return ({ success: true, message: res.data.message })
      }
    } catch (error) {
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  // APi personalizada para recibir un pedido
  const recibirPedidoContext = async (id) => {
    try {
      const res = await recibirPedido(id, token)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        // retorna el mensaje del servidor, esto es el controlador de la api
        return ({ success: true, message: res.data.message })
      }
    } catch (error) {
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  return (
    <PedidosContext.Provider value={{
      statePedido,
      getPedidosContext,
      getPedidoContext,
      crearPedidoContext,
      eliminarPedidoContext,
      actualizarPedidoContext,
      recibirPedidoContext
    }}>
      {children}
    </PedidosContext.Provider>
  )
}



