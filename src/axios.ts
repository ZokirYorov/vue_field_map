import axios from "axios";
import router from "@/router/router";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // http://localhost:8080
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && (error.response.status === 403 || error.response.status === 401)) {
//             localStorage.removeItem("accessToken");
//             router.push('/login').then(r => r);
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;