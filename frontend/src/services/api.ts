import axios from 'axios';

const instance = axios.create({
  baseURL: `https://api.inventory.kos-devpoint.ru/api`,
  headers: {
    Accept: '*/*',
    'Access-Control-Allow-Origin': `https://api.inventory.kos-devpoint.ru/`,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default instance;
