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
export const getStock = (id, token) => {
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