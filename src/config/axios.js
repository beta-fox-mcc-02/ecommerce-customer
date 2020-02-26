import axios from 'axios';

const heroku = 'https://git.heroku.com/protected-taiga-69173.git';
const instance = axios.create({
  baseURL: heroku,
});

export default instance;