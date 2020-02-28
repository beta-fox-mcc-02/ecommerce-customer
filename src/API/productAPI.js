const axios = require('axios');

const productAPI = axios.create({
  baseURL: 'https://powerful-taiga-55412.herokuapp.com/products',
});

module.exports = productAPI;
