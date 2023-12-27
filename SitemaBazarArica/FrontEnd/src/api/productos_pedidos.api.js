import axios from 'axios'

const productosPedidosApi = axios.create({
  baseURL: 'http://localhost:8000/usuarios/datos/v1/productos_pedidos' // la urls por defectos
})

export const getAllProductosPedidos = (token) => {
  return productosPedidosApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createProductoPedido = async (productoPedido, token) => {
  return productosPedidosApi.post('/', productoPedido, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deleteProductoPedido = (id, token) => {
  return productosPedidosApi.delete(`/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updateProductoPedido = (id, productoPedido, token) => {
  return productosPedidosApi.put(`/${id}/`, productoPedido, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const getProductoPedido = (id, token) => {
  return productosPedidosApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}