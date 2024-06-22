import axios from 'axios'
const usuarioLoginApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/usuarios/login'

})

const usuarioLogoutApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/usuarios/logout'
})
const usuarioGetApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/usuarios/get_usuario_logeado'
})
export const token = async () => {
  // Ejemplo en React usando fetch para obtener el token CSRF desde Django
  return await fetch('http://127.0.0.1:8000/usuarios/csrf/', {
    method: 'GET',
    credentials: 'include' // Para incluir cookies en la solicitud
  })
    .then(response => {
    // El token CSRF estará presente en las cookies de la respuesta
      return document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)')?.pop()

    // Ahora puedes usar csrfToken para enviarlo en tus solicitudes POST desde React
    })
    .catch(error => {
      console.error('Error al obtener el token CSRF:', error)
    })
}
export const login = async (usuario) => {
  const csrftoken = await token() // Obtener el token CSR
  console.log(csrftoken)
  console.log('Logeandose...')
  return usuarioLoginApi.post('/', usuario, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': csrftoken,
      
    }
  })
}
export const logout = async (token) => {
  return usuarioLogoutApi.post('/', {}, {
    headers: {
      Authorization: `Token ${token}`	 
    }
  })
}
export const getUser = async (token) => {
  console.log('Oteniendo usuario actual...')
  return usuarioGetApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    },
    timeout: 3000 // el maximo de tiempo que se espera la respuesta es de 3 segundos de lo contrario se cancela la peticion
  })
}