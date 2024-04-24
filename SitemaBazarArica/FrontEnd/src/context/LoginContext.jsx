// Contexto para un usuario Logeado
import { createContext, useReducer } from 'react'

import { LoginReducer } from './reducers/LoginReducer'
import { login, logout, getUser } from '../api/usuarioLogin.api'
export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {

  const initialState = {
    token: null,
    usuario: null,
    loading: false,
    isAuth: false
  }
  const [stateLogin, dispatch] = useReducer(LoginReducer, initialState)
  // Funciones para los usuarios que se van a usar en los componentes que esten dentro del contexto de los usuarios (UsuariosProvider)

  // ASI TENGO TODO EL CODIGO DE LOS USUARIOS EN UN SOLO LUGAR Y NO TENGO QUE IMPORTAR LAS FUNCIONES EN CADA COMPONENTE QUE LAS NECESITE
  // UNICAMENTE SE PASAN LOS PARAMETROS QUE NECESITAN LAS FUNCIONES

  const iniciarSesion = async (usuario) => {
    try {
      const res = await login(usuario) // res para referenciarse al response del servidor
      console.log(res.data)
      console.log(res.data.token)
      if (res.status === 200) {
        const data = res.data.token
        // Guarda el token en el localStorage
        // Cuando se cierra el navegador, el token guardado se elimina
        // Cuando el usuario recarga la página, el token se obtiene desde el localStorage
        localStorage.setItem('token', data)
        dispatch({
        type: 'LOGIN',
          payload: res.data
        })
      }

      return ({ success: true, message: res.data.message, rol: res.data.usuario.rol })
    } catch (error) { // si hay un error en la peticion se ejecuta este bloque que captura el response del servidor
      console.error(error)
      return ({ success: false, message: error.response.data.error, tipo: error.response.data.tipo })
    }
  }
  const cerrarSesion  = async (token) => {

    try {
      const res = await logout(token)
      console.log(res)
      if (res.status === 200) {
        dispatch({
          type: 'LOGOUT'
        })

        return ({ success: true, message: res.data.message })
      }
      
    } catch (error) {
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  const obtenerUsuarioLogeado = async (token) => {

    // El token se obtiene desde el localStorage
    
    try {
      const res = await getUser(token)
      if (res.status === 200) {
        dispatch({
          type: 'LOGIN',
          payload: res.data
        })
      }
    } catch (error) {
      console.error(error)
      return ({ success: false, message: error.response.data.error })
    }
  }
  return (
    <LoginContext.Provider value={{
      iniciarSesion,
      cerrarSesion,
      obtenerUsuarioLogeado,
      stateLogin
    }}>
    { children } 
    </LoginContext.Provider>
  )
}
// Contexto de Login
// Repositorio en https://github.com/Gabriel117343
