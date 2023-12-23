import axios from 'axios'

const proveedoresApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/usuarios/datos/v1/proveedores' // la urls por defectos
})
// ESTE ES EL CRUD DE PROVEEDORES 

export const getAllProveedores = (token) => {
  return proveedoresApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getProveedor = (id, token) => {
  return proveedoresApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createProveedor = async (proveedor, token) => {
  return proveedoresApi.post('/', proveedor, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deleteProveedor = (id, token) => {
  return proveedoresApi.delete(`/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updateProveedor = (id, proveedor, token) => {
  return proveedoresApi.put(`/${id}/`, proveedor, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}