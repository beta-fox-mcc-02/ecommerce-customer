import axios from 'axios';

const heroku = 'https://protected-taiga-69173.herokuapp.com/';
const instance = axios.create({
  baseURL: heroku,
});

export default instance;