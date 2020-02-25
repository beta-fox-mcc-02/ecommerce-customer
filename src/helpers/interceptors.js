import axios from 'axios'
export default function setup() {
  console.log('triggered')
  axios.interceptors.request.use(
    function(config) {
      console.log('config triggered')
      const token = localStorage.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    function(err) {
      return Promise.reject(err)
    }
  )
}
