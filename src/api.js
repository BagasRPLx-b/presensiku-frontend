import axios from 'axios';

const API = axios.create({
  // WAJIB menggunakan https:// agar tidak dianggap sebagai folder lokal
  baseURL: 'https://presensiku-backend-production-4cb2.up.railway.app',

  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default API;