import Axios from 'axios'
import Router from '@/router'

const Api = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

Api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 503) {
    Router.push({ name: 'maintenance' })
  }

  return Promise.reject(error)
})

export default Api
