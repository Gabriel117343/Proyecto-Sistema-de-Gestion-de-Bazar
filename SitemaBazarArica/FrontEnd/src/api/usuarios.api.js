import axios from 'axios'// para hacer peticiones al back end
// crear una instancia con la direccion
const usuariosApi = axios.create({
  // la urls por defectos
  baseURL: 'http://127.0.0.1:8000/usuarios/datos/v1/usuarios'
})
// Este es el crud
export const getAllUsers = (token) => {
  // return axios.get("http://127.0.0.1:8000/usuarios/datos/v1/usuarios/") > anterior
  return usuariosApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  }) // > nueva forma
}
export const getUser = (id, token) => {
  return usuariosApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createUser = async (usuario, token) => { // es necesario enviar la imagen como parametro para que se pueda enviar al servidor
  console.log(usuario)
  console.log(token)
  return usuariosApi.post('/', usuario, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deleteUser = (id, token) => {
  return usuariosApi.delete(`/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updateUser = (id, usuario, token) => {
  console.log(id)
  console.log(usuario)
  console.log(token)
  return usuariosApi.put(`/${id}/`, usuario, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}


// SIMULACION DE LA API DE USUARIOS EN DJANGO COMO BACKEND