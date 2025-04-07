import axios from 'axios';
import {CONFIG} from '@/config/config';

export const getUserTypes = async () => {
  const response = await axios.get(`${CONFIG.API_URL}/userTypes`);
  return response.data;
};
