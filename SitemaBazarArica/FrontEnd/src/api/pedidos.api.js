import axios from 'axios'

const pedidosApi = axios.create({
  baseURL: 'http://localhost:8000/usuarios/datos/v1/pedidos' // la urls por defectos
})

export const getAllPedidos = (token) => {
  return pedidosApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getPedido = (id, token) => {
  return pedidosApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createPedido = async (pedido, token) => {
  
  return pedidosApi.post('/', pedido, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deletePedido = (id, token) => {
  return pedidosApi.delete(`/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updatePedido = (id, pedido, token) => {
  return pedidosApi.put(`/${id}/`, pedido, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}