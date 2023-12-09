import axios from 'axios';

export const url =
  process.env.NODE_ENV === 'production' ? 'https://api.example.com' : 'http://localhost:8080/api';

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default instance;
