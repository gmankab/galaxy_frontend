import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://paul.freemyip.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});
