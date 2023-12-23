import axios from 'axios'
const seccionesApi = axios.create({
  baseURL: 'http://localhost:8000/usuarios/datos/v1/secciones' // la urls por defectos
})
// ESTE ES EL CRUD DE SECCIONES
export const getAllSecciones = (token) => {
  return seccionesApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getSeccion = (id, token) => {
  return seccionesApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createSeccion = async (seccion, token) => {
  return seccionesApi.post('/', seccion, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deleteSeccion = (id, token) => {
  return seccionesApi.delete(`/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updateSeccion = (id, seccion, token) => {
  return seccionesApi.put(`/${id}/`, seccion, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
