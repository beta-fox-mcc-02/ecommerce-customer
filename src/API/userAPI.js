const axios = require('axios');

const userAPI = axios.create({
  baseURL: 'https://powerful-taiga-55412.herokuapp.com/',
});

module.exports = userAPI;
