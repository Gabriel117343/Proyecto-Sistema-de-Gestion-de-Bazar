import { createContext, useContext, useReducer } from 'react'
import { LoginContext } from './LoginContext'
import { ProductosPedidosReducer } from './reducers/ProductosPedidosReducer'
import { getAllProductosPedidos, createProductoPedido, deleteProductoPedido, updateProductoPedido, getProductoPedido } from '../api/productos_pedidos.api'
export const ProductosPedidosContext = createContext()

export const ProductosPedidosProvider = ({ children }) => {

  const { stateLogin: { token } } = useContext(LoginContext)
  const initialState = {
    listaPedidos: [],
    pedidoSeleccionado: null
  }
  const [productosPedidosState, dispatch] = useReducer(ProductosPedidosReducer, initialState)
  // ASI TENGO TODO EL ESTADO DEL CONTEXTO
  const getAllProductosPedidosContext = async () => {
    console.log('first')
    try {
      const res = await getAllProductosPedidos(token)
      if (res.status === 200 || res.status === 201) {
        console.log(res.data.data)
        dispatch({
          type: 'GET_PEDIDOS',
          payload: res.data.data
        })
      
        return ({ success: true, message: res.data.message })
      }
    } catch (error) {
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  const crearProductoPedidoContext = async (productoPedido) => {
    const data = await createProductoPedido(productoPedido, token)
    try {
      if (data.status === 200 || data.status === 201) {
        dispatch({
          type: 'CREATE_PEDIDO',
          payload: data.data.data
        })
        return ({ success: true, message: data.data.message })
      }
    
    } catch (error) {
      return ({ success: false, message: error.response.data.error })
    
    }
  }
  const borrarProductoPedidoContext = async (id) => {
    await deleteProductoPedido(id, token)
    dispatch({
      type: 'DELETE_PEDIDO',
      payload: id
    })
  }
  const actualizarProductoPedidoContext = async (pedido) => {
    const data = await updateProductoPedido(pedido, token)
    dispatch({
      type: 'UPDATE_PEDIDO',
      payload: data
    })
  }
  const getProductoPedidoContext = async (id) => {
    const data = await getProductoPedido(id, token)
    dispatch({
      type: 'GET_PEDIDO',
      payload: data
    })
  }
  return (
    <ProductosPedidosContext.Provider value={{
      productosPedidosState,
      getAllProductosPedidosContext,
      crearProductoPedidoContext,
      borrarProductoPedidoContext,
      actualizarProductoPedidoContext,
      getProductoPedidoContext
    }}>
      {children}
    </ProductosPedidosContext.Provider>
  )
}