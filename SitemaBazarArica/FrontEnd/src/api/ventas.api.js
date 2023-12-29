import axios from 'axios'

const ventasApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/usuarios/datos/v1/ventas'
})

export const getAllVentas = (token) => {
  return ventasApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export const createVenta = async (venta, token) => {
  console.log(venta)
  console.log(token)
  return ventasApi.post('/', venta, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}