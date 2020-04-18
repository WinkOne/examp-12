import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:5556'
});


export default axiosApi;