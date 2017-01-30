import * as axios from 'axios';

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? (
    'https://analogio.dk/shiftplanning/api'
  ) : (
    'https://analogio.dk/beta/shiftplanning/api'
  ),
});

export function setAuthorizationToken(token: string) {
  client.interceptors.request.use(config => {
    config.headers['Authorization'] = token;
    return config;
  });
}

export default client;
