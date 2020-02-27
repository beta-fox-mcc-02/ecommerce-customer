const axios = require('axios');

const cartAPI = axios.create({
  baseURL: 'http://localhost:3000/carts',
});

module.exports = cartAPI;
