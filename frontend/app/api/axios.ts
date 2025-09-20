import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:8000/api", 
  // Pour Android Emulator ; utiliser http://localhost:8000/api sur iOS ou navigateur
});

export default api;
