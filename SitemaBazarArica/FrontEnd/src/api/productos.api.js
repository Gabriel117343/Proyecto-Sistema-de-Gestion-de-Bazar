import axios from 'axios'

const productosApi = axios.create({
  baseURL: 'http://localhost:8000/usuarios/datos/v1/productos' // la urls por defectos
})

export const getAllProductos = (token) => {
  return productosApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getProducto = (id, token) => {
  return productosApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createProducto = async (producto, token) => {
  return productosApi.post('/', producto, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deleteProducto = (id, token) => {
  return productosApi.delete(`/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updateProducto = (id, producto, token) => {
  return productosApi.put(`/${id}/`, producto, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
