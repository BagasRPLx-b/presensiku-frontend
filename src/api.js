// ============================================================
// API Configuration — Axios Instance
// ============================================================
// Ubah baseURL di bawah ini sesuai dengan alamat backend Anda.
// Contoh:
//   - Lokal:      http://localhost:3000
//   - LAN/WiFi:   http://192.168.1.100:3000
//   - Production: https://api.presensi-ku.com

import axios from 'axios';

const API = axios.create({
  // ========================================
  // ⬇️ GANTI URL INI SESUAI BACKEND ANDA ⬇️
  // ========================================
  baseURL: 'http://localhost:3000',

  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 detik timeout
});

export default API;
