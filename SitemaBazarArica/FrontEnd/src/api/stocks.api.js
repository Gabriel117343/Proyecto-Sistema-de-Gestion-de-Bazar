import axios from 'axios'
const stocksApi = axios.create({
  baseURL: 'http://localhost:8000/usuarios/datos/v1/stocks' // la urls por defectos
})

export const getAllStocks = (token) => {
  return stocksApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getStock = (id, token) => { // id del stock
  return stocksApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updateStock = (id, stock, token) => {
  return stocksApi.put(`/${id}/`, stock, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
// recibir el stock, api personalizada
export const recibirStock = (id, cantidad, token) => {
  return stocksApi.put(`/${id}/recibir/`, cantidad, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
