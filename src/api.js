// src/api.js
import axios from 'axios';
const api = axios.create({ baseURL: `https://cric-score-vhpw.onrender.com/api` });
export default api;