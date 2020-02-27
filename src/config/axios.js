import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://secure-anchorage-23075.herokuapp.com'
});

export default instance
//https://secure-anchorage-23075.herokuapp.com
//http://localhost:3000
