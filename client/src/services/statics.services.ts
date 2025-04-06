import axios from 'axios';
import {CONFIG} from '@/config/config';

export const getStatistics = async () => {
  const response = await axios.get(`${CONFIG.API_URL}/statics`);
  return response.data;
};
