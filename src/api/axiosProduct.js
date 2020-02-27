import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://mysterious-beach-02436.herokuapp.com'
})

export default axiosInstance