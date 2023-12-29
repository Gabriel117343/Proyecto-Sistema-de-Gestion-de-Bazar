import { createContext, useContext, useReducer } from 'react'
import { VentasReducer } from './reducers/VentasReducer'
import { LoginContext } from '../context/LoginContext'
import { createVenta, getAllVentas } from '../api/ventas.api' // api de ventas
export const VentasContext = createContext()

export const VentasProvider = ({ children }) => {
  const { stateLogin: { token } } = useContext(LoginContext)
  const initialState = {
    ventas: [],
    ventaSeleccionada: null,

  }
  const [stateVenta, dispatchVenta] = useReducer(VentasReducer, initialState)

  // Funciones para el CRUD
  // ASI TENGO TODAS LAS FUNCIONES QUE SE USARAN EN EL CRUD
  // PARA USARLAS EN LOS COMPONENTES

  const createVentaContext = async (venta) => {
    
    try {
      const res = await createVenta(venta, token)
      
      if (res.status === 200 || res.status === 201) {
        dispatchVenta({ type: 'CREATE_VENTA', payload: res.data })
      }
      
      return { success: true, message: res.data.message }
    } catch (error) {
      return { success: false, message: error.response.data.message }
    }
  }
  const getVentasContext = async () => {
    try {
      const res = await getAllVentas(token)
      if (res.status === 200) {
        dispatchVenta({ type: 'GET_VENTAS', payload: res.data })
      }
      return { success: true, message: res.data.message }
    } catch (error) {
      return { success: false, message: error.response.data.message }
    }
  }
  return ( 
    <VentasContext.Provider value={{
      stateVenta,
      createVentaContext,
      getVentasContext
    }}>
      {children}
    </VentasContext.Provider>
  )
}