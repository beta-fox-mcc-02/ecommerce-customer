import axios from 'axios'

const ecommerce = axios.create({
  baseURL: 'https://tranquil-inlet-43823.herokuapp.com'
})

export default ecommerce
