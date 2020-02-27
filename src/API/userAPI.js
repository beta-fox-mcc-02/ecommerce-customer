const axios = require('axios');

const userAPI = axios.create({
  baseURL: 'http://localhost:3000/',
});

module.exports = userAPI;
