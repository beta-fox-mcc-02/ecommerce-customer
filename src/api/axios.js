const axios = require('axios')

export default axios.create({
  baseURL: 'http://localhost:3000/'
  // baseURL: 'https://playme-h8.firebaseapp.com/'
})
