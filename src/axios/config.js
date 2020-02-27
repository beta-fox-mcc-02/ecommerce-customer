import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://stark-hamlet-59602.herokuapp.com'
})

export default instance
