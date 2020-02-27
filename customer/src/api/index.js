import axios from 'axios'

const api = axios.create({
  baseURL: 'https://frozen-savannah-42068.herokuapp.com'
})

export default api
