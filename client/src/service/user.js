import jwtDecode from 'jwt-decode';
import http from './http'


// * Get token from localStorage
const getJwt = () => localStorage.getItem(http.tokenKey);


http.includeTokenInRequests(getJwt());

// * Register
const register = (user) => http.post(`auth/register`, user)

// * login
const login = async (user) => {
    const { data: jwt } = await http.post(`auth/login`, user)
    localStorage.setItem(http.tokenKey, jwt);
}

// * Logout
const logout = () => localStorage.removeItem(http.tokenKey);


// * Set token in localStorage
const setTokenInLocalStorage = (jwt) => localStorage.setItem(http.tokenKey, jwt);


const getCurrentUser = () => {
    try {
        return jwtDecode(localStorage.getItem(http.tokenKey));
    } catch (error) {
        return null;
    }
}


export default {
    register,
    login,
    logout,
    setTokenInLocalStorage,
    getJwt,
    getCurrentUser,
}