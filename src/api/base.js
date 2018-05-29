import axios from "axios"

const BASE_URL = process.env.REACT_APP_API_URL;

let api = axios.create({
    baseURL: BASE_URL,
    headers: {}
});

window.api = api;

export default api;
