import axios from 'axios';
import config from './config';

export const getUser = (params) => {
  return axios.get('/user', { ...config, ...{params} });
};

export const createUser = (data) => {
  return axios.post('/user', data, config);
};

export const updateUser = (_id, data) => {
  return axios.put(`/user/${_id}`, data, config);
}

export const deleteUser = (id) => {

}