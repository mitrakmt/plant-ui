const jwt_decode = require('jwt-decode');

export const getAuthToken = () => localStorage.getItem('token');
export const setToken = token => localStorage.setItem('token', token);
export const removeTokens = () => localStorage.removeItem('token');

export const verifyToken = token => {
  if (token) {
    let decoded = jwt_decode(token);
    let current_time = new Date().getTime() / 1000;
    if (current_time > decoded.exp) {
      removeTokens();
      return false;
    }

    return decoded;
  }
  return false;
};
