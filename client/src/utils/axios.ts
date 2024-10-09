import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    }
})

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {

        // status == 401 => refresh token
        return Promise.reject(error);
    }
)

export default instance;