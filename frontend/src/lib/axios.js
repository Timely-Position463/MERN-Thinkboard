import axios from "axios";

//to make the port dynamic 
const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:5000/api/":"/api"
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
