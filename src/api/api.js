import axios from 'axios'

const ecommerce = axios.create({
  baseURL: 'https://blooming-escarpment-15217.herokuapp.com/'
})

export default ecommerce
