import axios from 'axios'

export const httpClient = axios.create({
  baseURL: `http://localhost:3000/api/v1/`,
  timeout: 60000,
})
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  if (token) {
    // add header for Authorization
    // config.headers.Authorization = `Bearer ${token}`
    config.headers['Content-Type'] = 'application/json'
    config.headers['access-token'] = token
    config.headers.client = client
    config.headers.uid = uid
  } else {
    delete config.headers.Authorization
  }

  return config
})
