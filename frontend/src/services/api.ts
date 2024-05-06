import axios from 'axios';

const instance = axios.create({
  baseURL: `http://${import.meta.env.VITE_CLIENT_HOST}:${import.meta.env.VITE_SERVER_PORT}/api`,
  headers: {
    Accept: '*/*',
    'Access-Control-Allow-Origin': `http://${import.meta.env.VITE_CLIENT_HOST}:${import.meta.env.VITE_CLIENT_PORT}/`,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
   },
});

export default instance;
