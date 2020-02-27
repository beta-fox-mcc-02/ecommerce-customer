import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://obscure-lowlands-88720.herokuapp.com/'
  baseURL: 'http://localhost:3000'
})

export default instance
