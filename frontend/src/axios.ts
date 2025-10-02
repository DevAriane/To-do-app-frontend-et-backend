import axios from "axios";

const api = axios.create({
  baseURL: " https://nonoptionally-disturbed-scottie.ngrok-free.app/api",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
