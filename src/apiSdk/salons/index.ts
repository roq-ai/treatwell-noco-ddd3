import axios from 'axios';
import queryString from 'query-string';
import { SalonInterface, SalonGetQueryInterface } from 'interfaces/salon';
import { GetQueryInterface } from '../../interfaces';

export const getSalons = async (query?: SalonGetQueryInterface) => {
  const response = await axios.get(`/api/salons${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSalon = async (salon: SalonInterface) => {
  const response = await axios.post('/api/salons', salon);
  return response.data;
};

export const updateSalonById = async (id: string, salon: SalonInterface) => {
  const response = await axios.put(`/api/salons/${id}`, salon);
  return response.data;
};

export const getSalonById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/salons/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSalonById = async (id: string) => {
  const response = await axios.delete(`/api/salons/${id}`);
  return response.data;
};
