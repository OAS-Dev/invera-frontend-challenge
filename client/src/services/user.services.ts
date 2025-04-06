import axios from 'axios';
import {CONFIG} from '@/config/config';
import {User} from '@/interfaces/user.interface';

export const getAllUsers = async () => {
  const response = await axios.get(`${CONFIG.API_URL}/users`);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axios.get(`${CONFIG.API_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await axios.post(`${CONFIG.API_URL}/users`, user);
  return response.data;
};

export const updateUser = async (id: number, user: User) => {
  const response = await axios.put(`${CONFIG.API_URL}/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${CONFIG.API_URL}/users/${id}`);
  return response.data;
};
