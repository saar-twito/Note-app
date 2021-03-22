import jwtDecode from 'jwt-decode';
import http from './http'


// * Get token from localStorage
const getJwt = () => localStorage.getItem(http.tokenKey);


http.includeTokenInRequests(getJwt());

// * Register
const register = (user) => http.post(`/register`, user)

// * Sign in
const signIn = async (user) => {
    const { data: jwt } = await http.post(`/signIn`, user)
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
    signIn,
    logout,
    setTokenInLocalStorage,
    getJwt,
    getCurrentUser,
}