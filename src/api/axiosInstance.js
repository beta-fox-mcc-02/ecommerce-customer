import axios from 'axios'

const axiosInstance = axios.create({
   baseURL: 'https://secret-journey-78862.herokuapp.com',
})

export default axiosInstance