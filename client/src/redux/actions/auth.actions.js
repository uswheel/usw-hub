import axios from 'axios';
import { SET_USER } from "./types";
import { error } from './error';

export const login = (user) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get('/auth/login', { params: user })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        resolve();
      })
      .catch(err => {
        error(err);
        reject(err);
      });
  })
}

export const logout = () => {
  localStorage.removeItem('token');
  setToken(false);
  setUser();
};

const setUser = user => dispatch => {
  dispatch({
    type: SET_USER,
    payload: user
  })
};

const setToken = token => {
  if (token) axios.defaults.headers.common['Authorization'] = token;
  else delete axios.defaults.headers.common['Authorization'];
};