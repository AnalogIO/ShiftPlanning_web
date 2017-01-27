import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://analogio.dk/shiftplanning/api'
      : 'https://analogio.dk/beta/shiftplanning/api',
});
