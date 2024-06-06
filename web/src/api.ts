import axios from 'axios';

const api = axios.create({
  baseURL: 'http://paul.freemyip.com:8000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;

