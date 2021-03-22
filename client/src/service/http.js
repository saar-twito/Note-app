import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: 'http://localhost:4000/'
})

// When the server is not available
instance.interceptors.response.use(null, ex => {
    const expectedError = // Expected error
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500;

    if (!expectedError)  // Unexpected error
        toast.error('Server currently unavailable', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        });

    return Promise.reject(ex);
});

const includeTokenInRequests = (jwt) => {
    // * With every HTTP request, include this header (token)
    instance.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    includeTokenInRequests,
    tokenKey: "token"
};


