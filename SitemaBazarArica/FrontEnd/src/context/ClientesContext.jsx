import { createContext, useContext, useReducer } from 'react'
import { LoginContext } from './LoginContext'
import { ClientesReducer } from './reducers/ClientesReducer'
import { getAllClientes, createCliente, getCliente } from '../api/clientes.api'
export const ClientesContext = createContext() // crear el contexto

export const ClientesProvider = ({ children }) => {
  const { stateLogin: { token } } = useContext(LoginContext)
  const initialState = {
    clientes: [],
    clienteSeleccionado: null
  }
  const [stateCliente, dispatch] = useReducer(ClientesReducer, initialState)
  const getClientesContext = async () => {
    try {
      const res = await getAllClientes(token)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({ type: 'GET_CLIENTES', payload: res.data.data })
        
      }
      return { success: true, message:res.data.message }
    } catch (error) {
      console.error(error)
      return { success: false, message: error.response.data.error }
    } 
  }
  const crearClienteContext = async (cliente) => {
    try {
      const res = await createCliente(cliente, token)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({ type: 'CREATE_CLIENTE', payload: res.data.data })
        
      }
      return { success: true, message:res.data.message }
    } catch (error) {
      console.error(error)
      return { success: false, message: error.response.data.error }
    }
  }
  const getClienteContext = async (id) => {
    try {
      const res = await getCliente(id, token)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({ type: 'GET_CLIENTE', payload: res.data })
        
      }
      return { success: true, message:res.data.message }
    } catch (error) {
      console.error(error)
      return { success: false, message: error.response.data.error }
    }
  }
  return (
    <ClientesContext.Provider value={{
      getClientesContext,
      crearClienteContext,
      getClienteContext,
      stateCliente
    }}>
      { children }
    </ClientesContext.Provider>
  )
  
}