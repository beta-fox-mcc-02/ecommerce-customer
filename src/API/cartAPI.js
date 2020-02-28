const axios = require('axios');

const cartAPI = axios.create({
  baseURL: 'https://powerful-taiga-55412.herokuapp.com/carts',
});

module.exports = cartAPI;
