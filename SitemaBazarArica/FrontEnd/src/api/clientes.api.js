import axios from 'axios'

const clienteApi = axios.create({ // axios.create permite crear una instancia de axios con una configuración personalizada
    baseURL: 'http://localhost:8000/usuarios/datos/v1/clientes'
})

// crud
export const createCliente = async (cliente, token) => {
    return clienteApi.post('/', cliente, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`
        }
    })
}
export const getAllClientes = (token) => {
  return clienteApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getCliente = (id, token) => {
  return clienteApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}