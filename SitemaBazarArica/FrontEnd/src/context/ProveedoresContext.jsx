import { createContext, useReducer, useContext } from 'react'
import { getAllProveedores, getProveedor, createProveedor, deleteProveedor, updateProveedor } from '../api/proveedores.api'
import { ProveedoresReducer } from './reducers/ProveedoresReducer'
import { LoginContext } from './LoginContext'
export const ProveedoresContext = createContext() // creando el contexto de los proveedores para poder usarlo en cualquier componente

export const ProveedoresProvider = ({ children }) => {
  
  const { stateLogin: { token } } = useContext(LoginContext) // destructuring del token del estado global
  const initialState = {
    proveedores: [],
    proveedorSeleccionado: null
  } // estado inicial de los proveedores para el Reducer de los proveedores
  const [stateProveedor, dispatch] = useReducer(ProveedoresReducer, initialState) // creando el reducer de los proveedores
  // ASI TENGO TODO EL CODIGO DE LOS USUARIOS EN UN SOLO LUGAR Y NO TENGO QUE IMPORTAR LAS FUNCIONES EN CADA COMPONENTE QUE LAS NECESITE
  // UNICAMENTE SE PASAN LOS PARAMETROS QUE NECESITAN LAS FUNCIONES

  const getProveedoresContext = async () => {
    try {
      const res = await getAllProveedores(token) // res para referenciarse al response del servidor
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'GET_PROVEEDORES',
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
  const getProveedorContext = async (id) => {
    try {
      const res = await getProveedor(id, token)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'GET_PROVEEDOR',
          payload: res.data
        }) // si la peticion es exitosa se ejecuta el dispatch para actualizar el estado global de los proveedores
        return ({ success: true, message: res.data.message })
        // return ({ success: true, message: 'Usuario obtenido' }) > Asi se puede retornar un mensaje de exito sin necesidad de obtenerlo del response del servidor
      }
    } catch (error) { // si hay un error en la peticion se ejecuta este bloque que captura el response del servidor 
      return ({ success: false, message: error.response.data.error })
    }
  }
  const crearProveedor = async (proveedor) => {
    try {
      const res = await createProveedor(proveedor, token)
      console.log(res)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'CREATE_PROVEEDOR',
          payload: res.data.data
        }) // si la peticion es exitosa se ejecuta el dispatch para actualizar el estado global de los proveedores
        return ({ success: true, message: res.data.message })
        // return ({ success: true, message: 'Usuario obtenido' }) > Asi se puede retornar un mensaje de exito sin necesidad de obtenerlo del response del servidor
      }
    } catch (error) { // si hay un error en la peticion se ejecuta este bloque que captura el response del servidor

      return ({ success: false, message: error.response.data.error })
    }
  }
  const eliminarProveedor = async (id) => {
    try {
      const res = await deleteProveedor(id, token)
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'DELETE_PROVEEDOR',
          payload: id
        }) // si la peticion es exitosa se ejecuta el dispatch para actualizar el estado global de los proveedores
        return ({ success: true, message: res.data.message })
        // return ({ success: true, message: 'Usuario obtenido' }) > Asi se puede retornar un mensaje de exito sin necesidad de obtenerlo del response del servidor
      }
    } catch (error) { // si hay un error en la peticion se ejecuta este bloque que captura el response del servidor 
      return ({ success: false, message: error.response.data.error })
    }
  }
  const actualizarProveedor = async (id, proveedor) => {
    try {
      const res = await updateProveedor(id, proveedor, token)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'UPDATE_PROVEEDOR',
          payload: res.data.data
        }) // si la peticion es exitosa se ejecuta el dispatch para actualizar el estado global de los proveedores
        return ({ success: true, message: res.data.message })
        // return ({ success: true, message: 'Usuario obtenido' }) > Asi se puede retornar un mensaje de exito sin necesidad de obtenerlo del response del servidor
      }
    } catch (error) { // si hay un error en la peticion se ejecuta este bloque que captura el response del servidor 
      return ({ success: false, message: error.response.data.error })
    }
  }
  return (
    <ProveedoresContext.Provider value={{
      stateProveedor,
      getProveedoresContext,
      getProveedorContext,
      crearProveedor,
      eliminarProveedor,
      actualizarProveedor


    }}>{children}
    </ProveedoresContext.Provider>
  )
}