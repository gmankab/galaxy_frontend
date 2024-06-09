import axios from 'axios';

const api = axios.create({
  baseURL: 'https://paul.freemyip.com:443',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;

