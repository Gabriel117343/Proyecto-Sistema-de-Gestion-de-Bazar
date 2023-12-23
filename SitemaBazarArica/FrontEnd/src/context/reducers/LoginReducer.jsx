import React from 'react'

export const LoginReducer = (stateLogin, action) => {
  const { type, payload } = action

  switch (type) {
    case 'LOGIN':
      return {
        ...stateLogin,
        token: payload.token,
        usuario: payload.usuario,
        isAuth: true
      }
    case 'LOGOUT':
      return {
        ...stateLogin,
        token: null,
        usuario: null,
        isAuth: false
      }
    default:
      return stateLogin
  }
}
