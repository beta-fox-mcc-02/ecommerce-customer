const axios = require('axios');

const productAPI = axios.create({
  baseURL: 'http://localhost:3000/products',
});

module.exports = productAPI;
