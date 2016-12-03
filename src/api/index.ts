import * as axios from 'axios';

const client = axios.create({
  baseURL: 'https://analogio.dk/shiftplanning/api',
});

export function setAuthorizationToken(token: string) {
  client.interceptors.request.use(config => {
    config.headers['Authorization'] = token;
    return config;
  });
}

export default client;
