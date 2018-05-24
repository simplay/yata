import axios from 'axios'

const BASE_URL = 'http://localhost:3001/'

let api = axios.create({
    baseURL: BASE_URL,
    headers: {}
});

window.api = api;

export default api;
